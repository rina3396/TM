// app/settings/profile/page.tsx
// サーバーでプロフィールを取得して、編集フォームはクライアントで切り出してもOK
export default async function ProfilePage() {
    // TODO: サーバー側でプロフィール読込
    return (
        <section className="space-y-2">
            <h1 className="text-xl font-bold">プロフィール</h1>
            {/* TODO: 名前/アイコン/通知設定など */}
        </section>
    )
}