// FILE: lib/hooks/useChainStats.ts
'use client'
import useSWR from 'swr'
import { provider } from '@/lib/rpc'
import { getMinerRegistry } from '@/lib/contracts'
import type { Block } from 'ethers'

interface ChainStats {
  blockHeight: number
  tps: number
  hashrate: string
  activeMiners: number
}

const fetcher = async (): Promise<ChainStats> => {
  const blockHeight = await provider.getBlockNumber()

  const blockNums = Array.from({ length: 10 }, (_, i) => blockHeight - i)
  const blocks = (await Promise.all(blockNums.map((n) => provider.getBlock(n)))).filter(
    (b): b is Block => b !== null
  )

  let tps = 0
  if (blocks.length >= 2) {
    const totalTxns = blocks.reduce((sum, b) => sum + b.transactions.length, 0)
    const timeSpan = blocks[0]!.timestamp - blocks[blocks.length - 1]!.timestamp
    tps = timeSpan > 0 ? totalTxns / timeSpan : 0
  }

  let hashrate = '0'
  let activeMiners = 0
  try {
    const registry = getMinerRegistry(provider)
    const hr = await registry?.totalHashrate?.()
    const am = await registry?.activeMinerCount?.()
    if (hr !== null && hr !== undefined) {
      hashrate = hr.toString()
    }
    if (am !== null && am !== undefined) {
      activeMiners = Number(am)
    }
  } catch {
    // Contract not deployed yet — use defaults
  }

  return { blockHeight, tps, hashrate, activeMiners }
}

export function useChainStats() {
  return useSWR<ChainStats>('chainStats', fetcher, { refreshInterval: 12000 })
}
