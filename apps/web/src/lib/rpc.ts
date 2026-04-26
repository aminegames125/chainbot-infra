// FILE: lib/rpc.ts
import { JsonRpcProvider } from 'ethers'

export const RPC_URL = '/rpc'
export const CHAIN_ID = 13371

export const provider = new JsonRpcProvider(RPC_URL)
