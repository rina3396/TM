'use client';
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        // 公開鍵は anon でも publishable でもOK（プロジェクトのAnon Key）
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    );
}
