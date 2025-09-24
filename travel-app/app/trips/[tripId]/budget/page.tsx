// app/trips/[tripId]/budget/page.tsx
export default async function BudgetPage({ params }: { params: { tripId: string } }) {
    // TODO: 旅の費用一覧・合計・参加者割り勘など
    return (
        <section className="space-y-2">
            <h1 className="text-xl font-bold">予算・費用</h1>
            <p className="text-sm text-gray-600">tripId: {params.tripId}</p>
        </section>
    )
}