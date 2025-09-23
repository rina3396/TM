//TODO編集画面
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServer } from '@/lib/supabase/server'
import TodoForm from '@/components/todos/TodoForm'
import { updateTodo } from '../../actions'

type Props = { params: { id: string } }

export default async function TodoEditPage({ params }: Props) {
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

    const { data, error } = await supabase
        .from('todos')
        .select('id, title, description, done')
        .eq('id', params.id)
        .eq('user_id', session.user.id)
        .maybeSingle()

    if (error) throw error
    if (!data) notFound()

    async function action(formData: FormData) {
        'use server'
        await updateTodo(params.id, formData)
    }

    return (
        <main className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">TODO編集</h1>
            <TodoForm
                defaultValues={{ title: data.title, description: data.description ?? '', done: data.done }}
                action={action}
                submitLabel="更新"
                showDone
            />
            <div className="space-x-3">
                <Link className="text-blue-600 underline" href={`/todos/${data.id}`}>詳細へ戻る</Link>
                <Link className="text-blue-600 underline" href="/todos">一覧へ</Link>
            </div>
        </main>
    )
}
