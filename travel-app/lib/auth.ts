// lib/auth.ts
// 認証関連の薄いヘルパ。必要に応じて middleware/route から利用
// ・サーバー環境でのユーザーID取得
// ・権限チェック


// import { createServer } from "@/lib/supabase/server"


export async function getUserId(): Promise<string> {
    // TODO: Supabase セッションからユーザーIDを返す
    // const supabase = createServer()
    // const { data: { session } } = await supabase.auth.getSession()
    // if (!session) throw new Error("Unauthorized")
    return "TODO_USER_ID"
}