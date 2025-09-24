// app/trips/[tripId]/days/[date]/page.tsx
export default async function TripDayEditPage({ params }: { params: { tripId: string; date: string } }) {
    // TODO: 指定日のアクティビティ一覧を表示し、並び替え/追加/削除を提供
    return (
        <section className="space-y-2">
            <h1 className="text-xl font-bold">日別しおり編集</h1>
            <p className="text-sm text-gray-600">tripId: {params.tripId} / date: {params.date}</p>
            {/* TODO: DnD で並び替え・時間帯の入力フォームなど */}
        </section>
    )
}