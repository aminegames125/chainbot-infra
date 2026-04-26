import "dotenv/config";
import { Client, GatewayIntentBits, Collection, Events } from "discord.js";
import { readdirSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";
import cron from "node-cron";
import { initDB, pool } from "./lib/db.js";
import { error as embedError } from "./lib/discord.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Validate required env vars ─────────────────────────────────────────────────
const REQUIRED_ENV = [
  "DISCORD_TOKEN",
  "DISCORD_CLIENT_ID",
  "DATABASE_URL",
  "ENCRYPTION_KEY",
  "RPC_URL",
  "BOT_WALLET_PRIVATE_KEY",
  "EXPLORER_URL",
];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`[FATAL] Missing required env var: ${key}`);
    process.exit(1);
  }
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, any>;
  }
}

// ── Discord Client ─────────────────────────────────────────────────────────────
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
});

client.commands = new Collection();

// ── Load commands ──────────────────────────────────────────────────────────────
const commandsDir = join(__dirname, "commands");
const commandFiles = readdirSync(commandsDir).filter((f) => f.endsWith(".js") || f.endsWith(".ts"));

for (const file of commandFiles) {
  const module = await import(pathToFileURL(join(commandsDir, file)).href);
  if (!module.data || !module.execute) {
    console.warn(`[WARN] Command file ${file} missing data or execute export, skipping.`);
    continue;
  }
  client.commands.set(module.data.name, module);
  console.log(`[CMD] Loaded: /${module.data.name}`);
}

// ── Ready ──────────────────────────────────────────────────────────────────────
client.once(Events.ClientReady, async (c) => {
  console.log(`[BOT] Logged in as ${c.user.tag}`);
  console.log(`[BOT] Serving ${c.guilds.cache.size} guild(s)`);
  c.user.setActivity("the blockchain 🔗", { type: 3 }); // WATCHING

  // ── Scheduled maintenance ──────────────────────────────────────────────────
  // Prune expired cooldowns every hour (keeps the DB lean)
  cron.schedule("0 * * * *", async () => {
    try {
      const result = await pool.query(`
        DELETE FROM cooldowns
        WHERE (command = 'daily'  AND last_used < NOW() - INTERVAL '25 hours')
           OR (command = 'work'   AND last_used < NOW() - INTERVAL '2 hours')
           OR (command = 'gamble' AND last_used < NOW() - INTERVAL '5 minutes')
           OR (command = 'send'   AND last_used < NOW() - INTERVAL '1 minute')
      `);
      if (result.rowCount && result.rowCount > 0) {
        console.log(`[CRON] Pruned ${result.rowCount} stale cooldown row(s)`);
      }
    } catch (err) {
      console.error("[CRON] Cooldown prune failed:", (err as any).message);
    }
  });

  // RPC health-check every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    try {
      const { getProvider } = await import("@chainbot/shared");
      const provider = getProvider();
      const block = await provider.getBlockNumber();
      console.log(`[HEALTH] RPC OK — block #${block}`);
    } catch (err) {
      console.error("[HEALTH] RPC unreachable:", (err as any).message);
    }
  });

  console.log("[CRON] Scheduled jobs registered");
});

// ── Interaction handler ────────────────────────────────────────────────────────
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.warn(`[CMD] Unknown command: ${interaction.commandName}`);
    return;
  }

  console.log(
    `[CMD] /${interaction.commandName} by ${interaction.user.tag} (${interaction.user.id}) ` +
      `in guild ${interaction.guild?.name ?? "DM"}`
  );

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`[ERROR] /${interaction.commandName}:`, err);

    const replyPayload = {
      embeds: [embedError("An unexpected error occurred. Please try again later.")],
      ephemeral: true,
    };

    try {
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply(replyPayload);
      } else {
        await interaction.reply(replyPayload);
      }
    } catch (replyErr) {
      console.error("[ERROR] Failed to send error reply:", replyErr);
    }
  }
});

// ── Graceful shutdown ──────────────────────────────────────────────────────────
const shutdown = async (signal: string) => {
  console.log(`[BOT] Received ${signal}, shutting down…`);
  client.destroy();
  await pool.end();
  process.exit(0);
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// ── Boot ───────────────────────────────────────────────────────────────────────
(async () => {
  try {
    console.log("[DB] Connecting to Postgres…");
    await initDB();
    console.log("[BOT] Connecting to Discord…");
    await client.login(process.env.DISCORD_TOKEN);
  } catch (err) {
    console.error("[FATAL] Boot failed:", err);
    process.exit(1);
  }
})();
