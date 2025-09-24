// app/trips/new/page.tsx
"use client"

import { useState } from "react"

export default function TripNewPage() {
    const [title, setTitle] = useState("")

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: /api/trips に POST → 作成後 /trips/[tripId] へ遷移
    }

    return (
        <section className="p-4 max-w-md mx-auto">
            <h1 className="text-lg font-semibold mb-4">旅の新規作成</h1>
            <form onSubmit={onSubmit} className="space-y-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="旅のタイトル"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full rounded-md bg-black px-4 py-2 text-white text-sm hover:bg-gray-800"
                >
                    作成
                </button>
            </form>
        </section>
    )
}
