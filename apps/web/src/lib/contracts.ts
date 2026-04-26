// FILE: lib/contracts.ts
import { Contract, Signer, Provider } from 'ethers'
import { CONTRACT_ADDRESSES, ABIS } from '@chainbot/config'

type SignerOrProvider = Signer | Provider

export const getMintController = (signerOrProvider: SignerOrProvider) =>
  new Contract(CONTRACT_ADDRESSES.MintController, ABIS.MintController, signerOrProvider)

export const getMinerRegistry = (signerOrProvider: SignerOrProvider) =>
  new Contract(CONTRACT_ADDRESSES.MinerRegistry, ABIS.MinerRegistry, signerOrProvider)

export const getCoinToken = (signerOrProvider: SignerOrProvider) =>
  new Contract(CONTRACT_ADDRESSES.WETH, ABIS.ERC20, signerOrProvider)

export const getUniswapV2Pair = (signerOrProvider: SignerOrProvider) =>
  new Contract(CONTRACT_ADDRESSES.UniswapV2Factory, ABIS.UniswapV2Pair, signerOrProvider)

export const getStablecoinVault = (signerOrProvider: SignerOrProvider) =>
  new Contract(CONTRACT_ADDRESSES.VaultManager, ABIS.VaultManager, signerOrProvider)

export const getNFTCollection = (signerOrProvider: SignerOrProvider) =>
  new Contract(CONTRACT_ADDRESSES.NFTCollection, ABIS.NFTCollection, signerOrProvider)

export const deployments = CONTRACT_ADDRESSES
