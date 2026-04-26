CREATE TABLE IF NOT EXISTS wallets (
    discord_user_id TEXT PRIMARY KEY,
    address TEXT UNIQUE NOT NULL,
    encrypted_key TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cooldowns (
    discord_user_id TEXT NOT NULL,
    command TEXT NOT NULL,
    last_used TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (discord_user_id, command)
);

CREATE TABLE IF NOT EXISTS job_history (
    id SERIAL PRIMARY KEY,
    discord_user_id TEXT NOT NULL,
    job_name TEXT NOT NULL,
    reward_coin NUMERIC NOT NULL,
    tx_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS miner_sessions (
    address TEXT PRIMARY KEY,
    hashrate_khs NUMERIC NOT NULL,
    last_seen TIMESTAMPTZ NOT NULL
);
