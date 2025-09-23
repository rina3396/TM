// app/layout.tsx
import "./globals.css"; // ← これが必須。ここで Tailwind を読み込む

export const metadata = {
  title: "App",
  description: "Sample",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      {/* v4なら body にクラスを当ててもOK。フォント変数を使う場合はここに追加 */}
      <body className="min-h-[100dvh]"> 
        {children}
      </body>
    </html>
  );
}
