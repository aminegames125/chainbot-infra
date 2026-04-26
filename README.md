## one-server deploy (6 GB VPS)

### 1. init geth chain (first time only)
docker run --rm -v ./packages/geth:/geth ethereum/client-go:v1.13.14 \
  init /geth/genesis.json

### 2. create treasury wallet (first time only)
docker run --rm ethereum/client-go:v1.13.14 account new \
  --keystore ./packages/geth/keystore
# copy the address → TREASURY_ADDRESS in .env

### 3. deploy contracts (first time only)
cp .env.example .env   # fill in values
docker compose up -d geth postgres
sleep 10               # wait for geth to mine first block
pnpm --filter contracts exec hardhat run scripts/deploy.js --network chainbot

### 4. start everything
docker compose up -d

### 5. run tests (no build needed)
pnpm test              # vitest only (bot + web)
pnpm contracts:test    # hardhat tests (contracts)
pnpm test:all          # both sequentially

### update bot/web (no downtime on geth/postgres)
docker compose up -d --build discord-bot nextjs-web
