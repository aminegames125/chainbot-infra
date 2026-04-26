import { z } from "zod";

const baseSchema = z.object({
  RPC_URL: z.string().url().optional(),
  CHAIN_ID: z.coerce.number().default(13371),
});

const botSchema = baseSchema.extend({
  DISCORD_TOKEN: z.string().min(1),
  DISCORD_CLIENT_ID: z.string().min(1),
  TREASURY_ADDRESS: z.string().regex(/^0x[0-9a-fA-F]{40}$/),
  TREASURY_KEY: z.string().regex(/^0x[0-9a-fA-F]{64}$/),
  DATABASE_URL: z.string().url(),
});

const webSchema = baseSchema.extend({
  NEXT_PUBLIC_RPC_URL: z.string().url().optional(),
  NEXT_PUBLIC_CHAIN_ID: z.coerce.number().default(13371),
});

export function loadBotEnv() {
  const result = botSchema.safeParse(process.env);
  if (!result.success) {
    console.error("Invalid bot environment:");
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }
  return result.data;
}

export function loadWebEnv() {
  return webSchema.parse({
    RPC_URL: process.env.NEXT_PUBLIC_RPC_URL ?? process.env.RPC_URL,
    CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
  });
}

export type BotEnv = z.infer<typeof botSchema>;
export type WebEnv = z.infer<typeof webSchema>;
