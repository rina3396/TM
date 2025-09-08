//LP
import { createServer } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const supabase = createServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <div className="p-6">
        <p>このページはログインが必要です。</p>
        <Link className="text-blue-600 underline" href="/login">ログインへ</Link>
      </div>
    );
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">ようこそ！</h1>
      <p>現在のユーザー: {session.user.email}</p>
      <a className="text-blue-600 underline" href="/settings">プロフィール設定へ</a>
      <form action="/logout" method="post">
        <button className="rounded bg-gray-900 text-white px-4 py-2">ログアウト</button>
      </form>
    </main>
  );
}
