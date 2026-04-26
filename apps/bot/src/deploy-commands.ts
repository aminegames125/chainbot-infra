// FILE: apps/bot/src/deploy-commands.ts
import "dotenv/config";
import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const commands = [];
const commandsDir = join(__dirname, "commands");
const commandFiles = readdirSync(commandsDir).filter((f) => f.endsWith(".js") || f.endsWith(".ts"));

for (const file of commandFiles) {
  const module = await import(pathToFileURL(join(commandsDir, file)).href);
  if (module.data) {
    commands.push(module.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log(`[DEPLOY] Started refreshing ${commands.length} application (/) commands.`);

    const data: any = await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
      { body: commands }
    );

    console.log(`[DEPLOY] Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error("[DEPLOY] Error:", error);
  }
})();
