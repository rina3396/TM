import Link from 'next/link'
import { createServer } from '@/lib/supabase/server'
import { toggleDone, deleteTodo } from './actions'

export default async function TodoListPage() {
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

    const { data: todos, error } = await supabase
        .from('todos')
        .select('id, title, description, done, inserted_at')
        .eq('user_id', session.user.id)
        .order('inserted_at', { ascending: false })

    if (error) throw error

    return (
        <main className="p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">TODO一覧</h1>
                <Link className="text-blue-600 underline" href="/todos/new">新規作成</Link>
            </div>

            <ul className="space-y-3">
                {todos?.map((t) => (
                    <li key={t.id} className="flex items-start justify-between rounded border p-4">
                        <div className="space-y-1">
                            <Link className="font-semibold hover:underline" href={`/todos/${t.id}`}>
                                {t.done ? '✅ ' : ''}{t.title}
                            </Link>
                            {t.description && <p className="text-sm text-gray-600">{t.description}</p>}
                        </div>

                        {/* フォームは1つ。既定の action は toggleDone */}
                        <form
                            className="flex items-center gap-2"
                            action={async () => { 'use server'; await toggleDone(t.id, !t.done) }}
                        >
                            <button className="rounded border px-3 py-1">
                                {t.done ? '未完了に' : '完了に'}
                            </button>

                            {/* 削除は formAction で別アクションを割り当て */}
                            <button
                                className="rounded border px-3 py-1 text-red-600"
                                formAction={async () => { 'use server'; await deleteTodo(t.id) }}
                            >
                                削除
                            </button>

                            <Link className="rounded border px-3 py-1" href={`/todos/${t.id}/edit`}>
                                編集
                            </Link>
                        </form>
                    </li>
                ))}
            </ul>
        </main>
    )
}
