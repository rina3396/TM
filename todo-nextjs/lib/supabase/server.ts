// lib/supabase/server.ts（←これは env.ts を使ってOK）
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/env';

export function createServer() {
    const cookieStore = cookies();
    return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        cookies: {
            get: (name: string) => cookieStore.get(name)?.value,
            set: (name: string, value: string, options: CookieOptions) =>
                cookieStore.set({ name, value, ...options }),
            remove: (name: string, options: CookieOptions) =>
                cookieStore.set({ name, value: '', ...options }),
        },
    });
}
