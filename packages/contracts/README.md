# ChainBot Smart Contract Suite

Complete Hardhat project for the ChainBot EVM economy platform (Chain ID: 13371).

## Project Structure

```
contracts/
├── src/
│   ├── PriceOracle.sol          # Owner-controlled USD price feed
│   ├── MintController.sol       # Daily COIN claim + work rewards
│   ├── MemeToken.sol            # Fixed-supply ERC-20 template
│   ├── MemeCoinFactory.sol      # Deploys MemeTokens + Uniswap pairs
│   ├── StablecoinToken.sol      # Mintable/burnable synthetic ERC-20
│   ├── VaultManager.sol         # Multi-stablecoin collateral vaults
│   ├── NFTCollection.sol        # ERC-721 with on-chain SVG metadata
│   ├── MinerRegistry.sol        # Hashrate leaderboard
│   ├── GovernanceToken.sol      # ERC-20Votes governance token
│   └── uniswap/
│       ├── WETH9.sol            # Wrapped native COIN
│       ├── UniswapV2Core.sol    # Factory + Pair
│       └── UniswapV2Router02.sol# Router + Library
├── scripts/
│   ├── deploy.js                # Full ordered deployment
│   └── export-abis.js           # ABI export to abis/
├── test/
│   └── chainbot.test.js         # 19 tests covering all contracts
├── hardhat.config.js
└── package.json
```

## Setup

```bash
cp .env.example .env
# Edit .env: set DEPLOYER_PRIVATE_KEY

npm install
npx hardhat compile
npx hardhat test
```

## Deploy

```bash
# To ChainBot chain
npx hardhat run scripts/deploy.js --network chainbot

# To local Hardhat node
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

After deployment, `deployments.json` will be written containing all addresses + ABIs.

## Export ABIs

```bash
node scripts/export-abis.js
# Writes abis/<ContractName>.json + abis/index.json
```

## Networks

| Network   | URL                               | Chain ID |
|-----------|-----------------------------------|----------|
| chainbot  | https://chainbot.animeos.dev/rpc  | 13371    |
| localhost | http://127.0.0.1:8545             | 13371    |
| hardhat   | (in-process)                      | 13371    |

## Contract Summary

| Contract         | Role                                        |
|------------------|---------------------------------------------|
| PriceOracle      | USD price feed for all contracts            |
| MintController   | Daily COIN claim, work rewards (BOT_ROLE)   |
| WETH9            | Wrapped COIN for Uniswap                    |
| UniswapV2Factory | DEX pair factory (feeTo = treasury)         |
| UniswapV2Router02| DEX swap/liquidity router                   |
| MemeCoinFactory  | Deploy meme tokens + auto-create DEX pairs  |
| MemeToken        | Fixed-supply ERC-20 (1M, creator = owner)  |
| StablecoinToken  | Synthetic ERC-20 (VAULT_ROLE mint/burn)     |
| VaultManager     | CDP vaults, liquidation at 110% CR          |
| NFTCollection    | On-chain SVG NFTs, SHOP_ROLE mint           |
| MinerRegistry    | Hashrate leaderboard (self-reported)        |
| GovernanceToken  | ERC-20Votes (EIP-712 permit support)        |

## Key Parameters

- **Daily Claim**: 100 COIN, halves every 30 days, 24h cooldown per address
- **Stablecoins**: sUSD, sEUR, sGOLD, sBTC — 150% collateral ratio, 2% annual stability fee
- **Liquidation**: Anyone can liquidate when CR < 110%; liquidator earns 5% bonus
- **Meme creation fee**: 1000 COIN (configurable by owner)
- **Uniswap fee**: 0.3% per swap (standard V2)
