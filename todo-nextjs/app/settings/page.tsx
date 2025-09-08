//setting/page.tsx
//ログイン後の画面
import { createServer } from '@/lib/supabase/server';

export default async function SettingsPage() {
    const supabase = createServer();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return <div className="p-6">ログインしてください。</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-2">設定ページ</h2>
            <p>ここにプロフィール編集などを実装します。</p>
        </div>
    );
}
