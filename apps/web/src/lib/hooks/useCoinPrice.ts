// FILE: lib/hooks/useCoinPrice.ts
'use client'
import useSWR from 'swr'
import { provider } from '@/lib/rpc'
import { getUniswapV2Pair } from '@/lib/contracts'
import { formatEther } from 'ethers'

interface CoinPrice {
  price: number
  reserve0: bigint
  reserve1: bigint
  marketCap: number
  volume24h: number
}

const fetcher = async (): Promise<CoinPrice> => {
  try {
    const pair = getUniswapV2Pair(provider)
    const reserves = await pair?.getReserves?.()
    if (!reserves) {
      return { price: 0, reserve0: 0n, reserve1: 0n, marketCap: 0, volume24h: 0 }
    }
    const [r0, r1] = reserves
    const reserve0 = BigInt(r0.toString())
    const reserve1 = BigInt(r1.toString())

    // Assume token0 = COIN, token1 = USD-pegged stable
    const r0Val = parseFloat(formatEther(reserve0))
    const r1Val = parseFloat(formatEther(reserve1))
    const price = r0Val > 0 ? r1Val / r0Val : 0

    return {
      price,
      reserve0,
      reserve1,
      marketCap: price * 1_000_000, // placeholder supply
      volume24h: 0,
    }
  } catch {
    return { price: 0, reserve0: 0n, reserve1: 0n, marketCap: 0, volume24h: 0 }
  }
}

export function useCoinPrice() {
  return useSWR<CoinPrice>('coinPrice', fetcher, { refreshInterval: 12000 })
}
