// FILE: lib/hooks/useBlocks.ts
'use client'
import useSWR from 'swr'
import { provider } from '@/lib/rpc'
import type { Block } from 'ethers'

const fetcher = async (): Promise<(Block | null)[]> => {
  const latest = await provider.getBlockNumber()
  const blockNums = Array.from({ length: 20 }, (_, i) => latest - i)
  return Promise.all(blockNums.map((n) => provider.getBlock(n)))
}

export function useBlocks() {
  return useSWR<(Block | null)[]>('blocks', fetcher, { refreshInterval: 12000 })
}
