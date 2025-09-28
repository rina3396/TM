// app/s/[shareId]/page.tsx
// MVP: 占位表示のみ
export default async function PublicSharePage({ params }: { params: { shareId: string } }) {
    return (
        <section className="space-y-2">
            <h1 className="text-xl font-bold">公開しおり（プレビュー）</h1>
            <p className="text-sm text-gray-600">shareId: {params.shareId}</p>
            {/* TODO: 公開用のデータ読み込み/権限検証 */}
        </section>
    )
}