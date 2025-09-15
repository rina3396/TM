// next.config.ts
// const nextConfig = {
//   env: {
//     NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
//     NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//   },
// };
// export default nextConfig;

// next.config.js
// next.config.mjs
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 必要なら alias をここで定義（なくても tsconfig の paths があればOK）
  webpack: (config) => {
    config.resolve ??= {}
    config.resolve.alias ??= {}
    config.resolve.alias['@'] = path.resolve(__dirname, 'app')
    return config
  },
}

export default nextConfig

