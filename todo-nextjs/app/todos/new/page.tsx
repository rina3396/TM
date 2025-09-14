import Link from 'next/link'
import { createServer } from '@/lib/supabase/server'
import TodoForm from '@/components/todos/TodoForm'
import { createTodo } from '../actions'

export default async function TodoNewPage() {
    const supabase = createServer()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        return (
            <div className="p-6">
                <p>このページはログインが必要です。</p>
                <Link className="text-blue-600 underline" href="/login">ログインへ</Link>
            </div>
        )
    }

    return (
        <main className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">TODO作成</h1>
            <TodoForm action={createTodo} submitLabel="作成" />
            <Link className="text-blue-600 underline" href="/todos">一覧へ戻る</Link>
        </main>
    )
}
