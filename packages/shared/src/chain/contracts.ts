import { Contract, Provider, Signer } from "ethers";
// @ts-ignore
import { CONTRACT_ADDRESSES, ABIS } from "@chainbot/config";

export function getMintController(signerOrProvider?: Signer | Provider): Contract {
  return new Contract(CONTRACT_ADDRESSES.MintController, ABIS.MintController, signerOrProvider);
}

export function getPriceOracle(signerOrProvider?: Signer | Provider): Contract {
  return new Contract(CONTRACT_ADDRESSES.PriceOracle, ABIS.PriceOracle, signerOrProvider);
}

export function getVaultManager(signerOrProvider?: Signer | Provider): Contract {
  return new Contract(CONTRACT_ADDRESSES.VaultManager, ABIS.VaultManager, signerOrProvider);
}

export function getMemeCoinFactory(signerOrProvider?: Signer | Provider): Contract {
  return new Contract(CONTRACT_ADDRESSES.MemeCoinFactory, ABIS.MemeCoinFactory, signerOrProvider);
}

export function getNFTCollection(signerOrProvider?: Signer | Provider): Contract {
  return new Contract(CONTRACT_ADDRESSES.NFTCollection, ABIS.NFTCollection, signerOrProvider);
}

export function getMinerRegistry(signerOrProvider?: Signer | Provider): Contract {
  return new Contract(CONTRACT_ADDRESSES.MinerRegistry, ABIS.MinerRegistry, signerOrProvider);
}

export function getUniswapRouter(signerOrProvider?: Signer | Provider): Contract {
  return new Contract(CONTRACT_ADDRESSES.UniswapV2Router, ABIS.UniswapV2Router, signerOrProvider);
}

export function getUniswapFactory(signerOrProvider?: Signer | Provider): Contract {
  return new Contract(CONTRACT_ADDRESSES.UniswapV2Factory, ABIS.UniswapV2Factory, signerOrProvider);
}
