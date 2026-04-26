import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { unoptimized: true },
    transpilePackages: ["@chainbot/shared", "@chainbot/config"],
    experimental: {
    },
    async rewrites() {
        return [
            {
                source: '/rpc',
                destination: process.env.NEXT_PUBLIC_RPC_URL || 'http://127.0.0.1:8545',
            },
        ]
    },
}
export default nextConfig;
