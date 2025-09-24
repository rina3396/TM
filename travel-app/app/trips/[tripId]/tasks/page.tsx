// app/trips/[tripId]/tasks/page.tsx
export default async function TripTasksPage({ params }: { params: { tripId: string } }) {
    // TODO: 旅ごとのタスク（TODO/持ち物）一覧・チェック機能
    return (
        <section className="space-y-2">
            <h1 className="text-xl font-bold">TODO・持ち物</h1>
            <p className="text-sm text-gray-600">tripId: {params.tripId}</p>
        </section>
    )
}