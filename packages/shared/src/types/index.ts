export interface WalletRecord {
  discordUserId: string;
  address: string;
  encryptedKey?: string;
  createdAt: string | Date;
}

export interface VaultStatus {
  collateral: bigint;
  debt: bigint;
  ratio: number;
  liquidationPrice: bigint;
  stablecoin: string;
}

export interface MintEvent {
  txHash: string;
  recipient: string;
  amount: bigint;
  timestamp: number;
  authorized: boolean;
}

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  holders: number;
  pairAddress: string;
}

export interface MinerRecord {
  address: string;
  hashrateKHs: number;
  lastSeen: number;
}

export interface BlockSummary {
  number: number;
  hash: string;
  miner: string;
  txCount: number;
  gasUsed: bigint;
  timestamp: number;
  reward: bigint;
}

export interface TxSummary {
  hash: string;
  from: string;
  to: string | null;
  value: bigint;
  gasUsed: bigint;
  gasPrice: bigint;
  status: number;
  blockNumber: number;
  timestamp: number;
}

export interface StablecoinInfo {
  symbol: string;
  oracleKey: string;
  mintedSupply: bigint;
  collateralTotal: bigint;
  pegPrice: number;
  healthRatio: number;
}

export interface DailyClaimResult {
  recipient: string;
  amount: bigint;
  cooldownEnds: number;
  txHash: string;
}

export interface SwapQuote {
  tokenIn: string;
  tokenOut: string;
  amountIn: bigint;
  amountOut: bigint;
  priceImpact: number;
  route: string[];
}
