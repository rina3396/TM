// app/trips/new/page.tsx
"use client"
// 簡易フォームの雛形（タイトル/期間など）
import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { createClient } from "@/lib/supabase/client"


export default function TripNewPage() {
    const [title, setTitle] = useState("")
    // const router = useRouter()
    // const supabase = createClient()


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: /api/trips に POST → 作成後 /trips/[tripId] へ遷移
    }


    return (
        <section className="space-y-4">
            <h1 className="text-xl font-bold">旅の新規作成</h1>
            <form onSubmit={onSubmit} className="space-y-3">
                <input className="w-full rounded border p-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="旅のタイトル" />
                <button className="rounded bg-black px-4 py-2 text-white">作成</button>
            </form>
        </section>
    )
}