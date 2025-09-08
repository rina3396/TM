// lib/env.ts（サーバー側ユーティリティでだけ使う）
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // ここは dev で分かりやすく落とす用途。middleware からは使わないこと。
    throw new Error('Missing Supabase env: SUPABASE_URL / SUPABASE_ANON_KEY が未設定です。');
}
