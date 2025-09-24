// app/trips/[tripId]/page.tsx
import Link from "next/link"
// import { createServer } from "@/lib/supabase/server"


export default async function TripDashboardPage({ params }: { params: { tripId: string } }) {
    const { tripId } = params
    // TODO: tripId で旅データ取得（タイトル、期間、メンバーなど）


    return (
        <section className="space-y-4">
            <h1 className="text-xl font-bold">旅ダッシュボード</h1>
            <p className="text-sm text-gray-600">tripId: {tripId}</p>
            <ul className="list-disc pl-5 space-y-1">
                <li><Link className="underline" href={`/trips/${tripId}/preview`}>完成プレビュー</Link></li>
                <li><Link className="underline" href={`/trips/${tripId}/days/${new Date().toISOString().slice(0, 10)}`}>日別しおり編集</Link></li>
                <li><Link className="underline" href={`/trips/${tripId}/activities`}>アクティビティ</Link>（一覧/詳細）</li>
                <li><Link className="underline" href={`/trips/${tripId}/budget`}>予算・費用</Link></li>
                <li><Link className="underline" href={`/trips/${tripId}/tasks`}>TODO・持ち物</Link></li>
                <li><Link className="underline" href={`/trips/${tripId}/share`}>共有・メンバー</Link></li>
                <li><Link className="underline" href={`/trips/${tripId}/settings`}>旅の設定</Link></li>
            </ul>
        </section>
    )
}