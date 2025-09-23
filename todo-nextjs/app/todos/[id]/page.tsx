//TODO詳細画面
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServer } from '@/lib/supabase/server'

type Props = { params: { id: string } }

export default async function TodoDetailPage({ params }: Props) {
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
        .select('id, title, description, done, inserted_at, updated_at')
        .eq('id', params.id)
        .eq('user_id', session.user.id)
        .maybeSingle()

    if (error) throw error
    if (!data) notFound()

    return (
        <main className="p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{data.done ? '✅ ' : ''}{data.title}</h1>
                <div className="space-x-3">
                    <Link className="text-blue-600 underline" href={`/todos/${data.id}/edit`}>編集</Link>
                    <Link className="text-blue-600 underline" href="/todos">一覧へ</Link>
                </div>
            </div>
            {data.description && <p className="whitespace-pre-wrap">{data.description}</p>}
            <p className="text-sm text-gray-600">
                作成: {new Date(data.inserted_at).toLocaleString()} / 更新: {new Date(data.updated_at).toLocaleString()}
            </p>
        </main>
    )
}
