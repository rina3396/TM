// app/trips/[tripId]/share/page.tsx
export default async function TripSharePage({ params }: { params: { tripId: string } }) {
    // TODO: メンバー招待/権限設定/公開リンク生成
    return (
        <section className="space-y-2">
            <h1 className="text-xl font-bold">共有・メンバー</h1>
            <p className="text-sm text-gray-600">tripId: {params.tripId}</p>
        </section>
    )
}