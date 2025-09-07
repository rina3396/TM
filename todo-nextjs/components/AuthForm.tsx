'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Mode = 'login' | 'signup';

export default function AuthForm({ mode }: { mode: Mode }) {
    const supabase = createClient();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        setMsg(null);
        try {
            if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setMsg('確認メールを送信しました。受信ボックスを確認してください。');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                router.replace('/'); // ログイン後にホームへ
            }
        } catch (err: any) {
            setMsg(err.message ?? 'エラーが発生しました');
        } finally {
            setPending(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-4">
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
            </div>

            <button
                type="submit"
                disabled={pending}
                className="w-full rounded bg-black text-white py-2 disabled:opacity-70"
            >
                {pending ? '送信中…' : mode === 'signup' ? 'サインアップ' : 'ログイン'}
            </button>

            {msg && <p className="text-sm text-center text-red-600">{msg}</p>}
        </form>
    );
}
