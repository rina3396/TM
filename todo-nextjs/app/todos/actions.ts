'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServer } from '@/lib/supabase/server'

export async function createTodo(formData: FormData) {
    const supabase = createServer()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) redirect('/login')

    const title = String(formData.get('title') ?? '').trim()
    const description = String(formData.get('description') ?? '').trim()

    if (!title) {
        // シンプルに一覧へ戻す（本番はエラー表示など検討）
        redirect('/todos/new')
    }

    const { error } = await supabase.from('todos').insert({
        user_id: session.user.id,
        title,
        description,
    })
    if (error) throw error

    revalidatePath('/todos')
    redirect('/todos')
}

export async function updateTodo(id: string, formData: FormData) {
    const supabase = createServer()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) redirect('/login')

    const title = String(formData.get('title') ?? '').trim()
    const description = String(formData.get('description') ?? '').trim()
    const done = formData.get('done') === 'on'

    const { error } = await supabase
        .from('todos')
        .update({ title, description, done, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', session.user.id)
    if (error) throw error

    revalidatePath(`/todos/${id}`)
    revalidatePath('/todos')
    redirect(`/todos/${id}`)
}

export async function deleteTodo(id: string) {
    const supabase = createServer()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) redirect('/login')

    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id)
    if (error) throw error

    revalidatePath('/todos')
    redirect('/todos')
}

export async function toggleDone(id: string, nextDone: boolean) {
    const supabase = createServer()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) redirect('/login')

    const { error } = await supabase
        .from('todos')
        .update({ done: nextDone, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', session.user.id)
    if (error) throw error

    revalidatePath('/todos')
}
