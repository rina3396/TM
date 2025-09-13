'use client'

import { useState } from 'react'

type Props = {
    defaultValues?: { title?: string; description?: string; done?: boolean }
    action: (formData: FormData) => void
    submitLabel?: string
    showDone?: boolean
}

export default function TodoForm({
    defaultValues,
    action,
    submitLabel = '保存',
    showDone = false,
}: Props) {
    const [title, setTitle] = useState(defaultValues?.title ?? '')
    const [description, setDescription] = useState(defaultValues?.description ?? '')
    const [done, setDone] = useState(!!defaultValues?.done)

    return (
        <form action={action} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">タイトル</label>
                <input
                    name="title"
                    className="mt-1 w-full rounded border px-3 py-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">詳細</label>
                <textarea
                    name="description"
                    className="mt-1 min-h-28 w-full rounded border px-3 py-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            {showDone && (
                <label className="inline-flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="done"
                        checked={done}
                        onChange={(e) => setDone(e.target.checked)}
                    />
                    完了
                </label>
            )}
            <button className="rounded bg-gray-900 px-4 py-2 text-white">
                {submitLabel}
            </button>
        </form>
    )
}
