import { JsonRpcProvider, Wallet } from "ethers";
import { CHAIN_ID, RPC_HTTP_URL } from "../constants/index";

let _provider: JsonRpcProvider | null = null;
let _treasurySigner: Wallet | null = null;

export function getProvider(rpcUrl?: string): JsonRpcProvider {
  if (!_provider) {
    _provider = new JsonRpcProvider(rpcUrl ?? RPC_HTTP_URL, { chainId: CHAIN_ID, name: "chainbot" });
  }
  return _provider;
}

// Export provider as singleton for legacy compatibility
export const provider = new Proxy({} as JsonRpcProvider, {
  get: (target, prop) => {
    const p = getProvider();
    return (p as any)[prop];
  },
});

export function getTreasurySigner(): Wallet {
  if (!_treasurySigner) {
    const provider = getProvider();
    const botPrivateKey = process.env.BOT_WALLET_PRIVATE_KEY;
    if (!botPrivateKey) {
      throw new Error("BOT_WALLET_PRIVATE_KEY environment variable not set");
    }
    _treasurySigner = new Wallet(botPrivateKey, provider);
  }
  return _treasurySigner;
}

export function resetProvider() {
  _provider = null;
  _treasurySigner = null;
}
