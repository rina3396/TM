// app/trips/[tripId]/activities/[activityId]/page.tsx
export default async function ActivityDetailPage({ params }: { params: { tripId: string; activityId: string } }) {
    // TODO: アクティビティ詳細表示/編集フォーム
    return (
        <section className="space-y-2">
            <h1 className="text-xl font-bold">アクティビティ詳細</h1>
            <p className="text-sm text-gray-600">tripId: {params.tripId} / activityId: {params.activityId}</p>
        </section>
    )
}