FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
COPY packages/config/package.json ./packages/config/

RUN pnpm install --frozen-lockfile

COPY apps/web ./apps/web
COPY packages/shared ./packages/shared
COPY packages/config ./packages/config
COPY packages/contracts/deployments.json ./packages/contracts/deployments.json
COPY packages/contracts/abis ./packages/contracts/abis
COPY tsconfig.base.json ./

WORKDIR /app/apps/web
RUN pnpm build
CMD ["pnpm", "start"]
