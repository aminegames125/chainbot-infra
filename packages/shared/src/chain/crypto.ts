import crypto from "crypto";

const ALGO = "aes-256-gcm";
const KEY_BUF = Buffer.from(process.env.ENCRYPTION_KEY ?? "", "hex");

export function encryptPrivateKey(privateKey: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, KEY_BUF, iv);
  const encrypted = Buffer.concat([cipher.update(privateKey, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("hex"), tag.toString("hex"), encrypted.toString("hex")].join(":");
}

export function decryptPrivateKey(stored: string): string {
  const parts = stored.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted key format");
  }
  const [ivHex, tagHex, encHex] = parts;
  const iv = Buffer.from(ivHex || "", "hex");
  const tag = Buffer.from(tagHex || "", "hex");
  const encrypted = Buffer.from(encHex || "", "hex");
  const decipher = crypto.createDecipheriv(ALGO, KEY_BUF, iv);
  decipher.setAuthTag(tag);
  return decipher.update(encrypted) + decipher.final("utf8");
}

export interface WalletRow {
  is_custodial?: boolean;
  encrypted_key?: string;
}

export function signerFromWalletRow(row: WalletRow, signer: any) {
  if (!row.is_custodial || !row.encrypted_key) {
    throw new Error("This is a view-only wallet; cannot sign transactions.");
  }
  const pk = decryptPrivateKey(row.encrypted_key);
  const { Wallet } = require("ethers");
  return new Wallet(pk, signer);
}

export const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
