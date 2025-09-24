// app/page.tsx
// サーバーコンポーネント（デフォルト）
// ここでログインチェック → ログインしていなければ案内、していれば自分の旅一覧のリンクを表示
import Link from "next/link"


export default async function HomePage() {
  // TODO: サーバー側で Supabase セッションを取得し、旅一覧を表示
  // const supabase = createServer()
  // const { data: { session } } = await supabase.auth.getSession()


  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">ホーム（ダッシュボード）</h1>
      <p className="text-sm text-gray-600">ここに自分の旅一覧や最近の更新を表示します。</p>
      <div className="flex gap-3">
        <Link className="underline" href="/trips/new">新しい旅を作成</Link>
        {/* TODO: 自分の旅一覧へのリンク（/trips/[tripId]）を動的表示 */}
      </div>
    </section>
  )
}