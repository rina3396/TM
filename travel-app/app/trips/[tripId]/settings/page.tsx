// app/trips/[tripId]/settings/page.tsx
export default async function TripSettingsPage({ params }: { params: { tripId: string } }) {
    // TODO: タイトル/期間/カバー画像/タイムゾーンなど
    return (
        <section className="space-y-2">
            <h1 className="text-xl font-bold">旅の設定</h1>
            <p className="text-sm text-gray-600">tripId: {params.tripId}</p>
        </section>
    )
}