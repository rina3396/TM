// app/auth/signup/page.tsx
"use client"
import { useState } from "react"
// import { createClient } from "@/lib/supabase/client"


export default function SignupPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: supabase.auth.signUp({ email, password })
    }


    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">サインアップ</h1>
            <form onSubmit={onSubmit} className="space-y-3">
                <input className="w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                <input className="w-full rounded border p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />
                <button className="rounded bg-black px-4 py-2 text-white">作成</button>
            </form>
        </div>
    )
}