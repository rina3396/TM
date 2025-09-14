// app/page.tsx
import { createServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // 未ログインはログイン画面へ
    redirect('/login')
  }

  // ログイン済みは TODO 一覧へ
  redirect('/todos')
}
