// FILE: lib/hooks/useMintEvents.ts
'use client'
import useSWR from 'swr'
import { provider } from '@/lib/rpc'
import { getCoinToken } from '@/lib/contracts'
import { CONTRACT_ADDRESSES } from '@chainbot/config'

interface MintEvent {
  blockNumber: number
  timestamp: number
  txHash: string
  recipient: string
  amount: bigint
  type: 'DailyClaimed' | 'mintWork' | 'UNAUTHORIZED'
  isUnauthorized: boolean
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

const fetcher = async (): Promise<MintEvent[]> => {
  try {
    const coin = getCoinToken(provider)
    const latest = await provider.getBlockNumber()
    const fromBlock = Math.max(0, latest - 1000)

    const filter = coin.filters.Transfer(ZERO_ADDRESS)
    const logs = await coin.queryFilter(filter, fromBlock, latest)

    const events: MintEvent[] = await Promise.all(
      logs.map(async (log) => {
        const block = await provider.getBlock(log.blockNumber)
        const isUnauthorized =
          log.address.toLowerCase() !== CONTRACT_ADDRESSES.MintController.toLowerCase()

        // Safely access typed event args
        const args = (log as { args?: { to?: string; value?: bigint } }).args
        const recipient = args?.to ?? ZERO_ADDRESS
        const amount = args?.value ?? 0n

        return {
          blockNumber: log.blockNumber,
          timestamp: block?.timestamp ?? 0,
          txHash: log.transactionHash,
          recipient,
          amount,
          type: isUnauthorized ? 'UNAUTHORIZED' : ('mintWork' as const),
          isUnauthorized,
        }
      })
    )

    return events.sort((a, b) => b.blockNumber - a.blockNumber)
  } catch {
    return []
  }
}

export function useMintEvents() {
  return useSWR<MintEvent[] | undefined>('mintEvents', fetcher, { refreshInterval: 12000 })
}
