// app/page.tsx
import Link from "next/link"

export default async function HomePage() {
  // TODO: サーバー側で Supabase セッションを取得し、旅一覧を表示
  // const supabase = createServer()
  // const { data: { session } } = await supabase.auth.getSession()

  return (
    <section className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl md:text-2xl font-semibold">ホーム（ダッシュボード）</h1>

      <p className="text-sm text-foreground/70">
        ここに自分の旅一覧や最近の更新を表示します。
      </p>

      <div className="flex gap-3">
        <Link
          href="/trips/new"
          className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white text-sm hover:bg-gray-800"
        >
          新しい旅を作成
        </Link>

        {/* TODO: 自分の旅一覧へのリンク（/trips/[tripId]）を動的表示 */}
        {/* 例: <Link href={`/trips/${id}`} className="underline text-sm">旅一覧へ</Link> */}
      </div>
    </section>
  )
}
