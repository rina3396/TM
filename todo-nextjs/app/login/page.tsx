//logiin/page.tsx
import { createServer } from '@/lib/supabase/server';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';

export default async function LoginPage() {
    const supabase = createServer();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // すでにログイン済みならホームへ
    if (session) {
        return (
            <div className="max-w-sm mx-auto p-6">
                <p>すでにログインしています。</p>
                <Link className="text-blue-600 underline" href="/">ホームへ戻る</Link>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">ログイン</h1>
            <AuthForm mode="login" />
            <div className="text-center mt-4">
                <Link className="text-blue-600 underline" href="/signup">アカウントを作成</Link>
            </div>
        </div>
    );
}
