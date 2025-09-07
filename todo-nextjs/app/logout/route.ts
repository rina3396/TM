import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';

export async function POST() {
    const supabase = createServer();
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'));
}
