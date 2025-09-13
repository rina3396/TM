// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl

    // 1) ログイン系は基本素通り（/login, /signup, /auth/*, /logout）
    //    ただし「既にログイン済みなら /todos へ寄せる」（★）
    if (
        pathname.startsWith('/login') ||
        pathname.startsWith('/signup') ||
        pathname.startsWith('/auth') ||
        pathname === '/logout'
    ) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        const response = NextResponse.next({ request: { headers: request.headers } })

        if (!url || !key) return response

        const supabase = createServerClient(url, key, {
            cookies: {
                get: (name) => request.cookies.get(name)?.value,
                set: (name, value, options) => response.cookies.set({ name, value, ...options }),
                remove: (name, options) => response.cookies.set({ name, value: '', ...options }),
            },
        })
        const { data: { user } } = await supabase.auth.getUser()

        // ★ ログインページ等に来たが既にログイン済み → /todos へ
        if (user && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
            return NextResponse.redirect(new URL('/todos', request.url))
        }
        return response
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // 2) env 未設定でも 500 は返さない（開発中の詰み防止）
    const response = NextResponse.next({ request: { headers: request.headers } })
    if (!url || !key) {
        response.headers.set(
            'x-supabase-env-warning',
            `SUPABASE_URL=${String(!!url)} SUPABASE_ANON_KEY=${String(!!key)}`
        )
        return response
    }

    // 3) セッションのリフレッシュ（Cookie 橋渡し）
    const supabase = createServerClient(url, key, {
        cookies: {
            get: (name) => request.cookies.get(name)?.value,
            set: (name, value, options) => response.cookies.set({ name, value, ...options }),
            remove: (name, options) => response.cookies.set({ name, value: '', ...options }),
        },
    })
    const { data: { user } } = await supabase.auth.getUser()

    // 4) ルート（/）に来たときのデフォルト着地点を /todos に統一（★）
    if (user && pathname === '/') {
        return NextResponse.redirect(new URL('/todos', request.url))
    }

    // 5) 保護ページのガード例（任意）：未ログインなら /login へ（★）
    //    必要な配下を増やすなら startsWith を追加
    const isProtected =
        pathname.startsWith('/todos') ||
        pathname.startsWith('/settings')

    if (!user && isProtected) {
        const loginUrl = new URL('/login', request.url)
        // 戻り先を付けたい場合のみ（任意）
        loginUrl.searchParams.set('redirect', `${pathname}${search ?? ''}`)
        return NextResponse.redirect(loginUrl)
    }

    return response
}

// 画像/静的ファイルは除外
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
