export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-dvh">{children}</div>
      </body>
    </html>
  );
}
