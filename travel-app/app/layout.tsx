// app/layout.tsx
import "@/styles/globals.css"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Travel App",
  description: "りょこうアプリ MVP",
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 共通レイアウト（ヘッダー/フッター/トーストなどはここで）
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-white text-gray-900">
        <div className="mx-auto max-w-screen-md p-4">
          {/* TODO: 共通ヘッダー（ログイン/ログアウト、プロフィールリンク） */}
          <main className="py-4">{children}</main>
          {/* TODO: 共通フッター */}
        </div>
      </body>
    </html>
  )
}