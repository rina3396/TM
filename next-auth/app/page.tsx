import { createMiddlewareClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
//cookiesをインポート
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import { createServer } from 'http'

//メインページ（最初のページ）
const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  //セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      <div className="text-center text-xl">
        {session ? <div>ログイン済み</div> : <div>未ログイン</div>}
      </div>

    </>
  )
}

export default Home
