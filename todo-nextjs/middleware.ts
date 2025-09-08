// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 1) ログイン系は素通り（/login, /signup, /auth/*, /logout など）
    if (
        pathname.startsWith('/login') ||
        pathname.startsWith('/signup') ||
        pathname.startsWith('/auth') ||
        pathname === '/logout'
    ) {
        return NextResponse.next()
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // 2) env 未設定でも 500 は返さない（開発中の詰み防止）
    const response = NextResponse.next({ request: { headers: request.headers } })
    if (!url || !key) {
        // 開発中の可視化用ヘッダ（本番では不要なら消してください）
        response.headers.set(
            'x-supabase-env-warning',
            `SUPABASE_URL=${String(!!url)} SUPABASE_ANON_KEY=${String(!!key)}`
        )
        return response
    }

    // 3) セッションのリフレッシュ（Cookie を正しく橋渡し）
    const supabase = createServerClient(url, key, {
        cookies: {
            get: (name) => request.cookies.get(name)?.value,
            set: (name, value, options) => response.cookies.set({ name, value, ...options }),
            remove: (name, options) => response.cookies.set({ name, value: '', ...options }),
        },
    })

    // Cookie 同期のため呼ぶ（戻り値はここでは未使用）
    const { data: { user } } = await supabase.auth.getUser()

    // 4) もし特定パスを保護したい場合は下を解放（例：/settings 配下）
    // if (pathname.startsWith('/settings') && !user) {
    //   const loginUrl = new URL('/login', request.url)
    //   loginUrl.searchParams.set('redirect', pathname) // 戻り先渡し（任意）
    //   return NextResponse.redirect(loginUrl)
    // }

    return response
}

// 画像/静的ファイルは除外
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
