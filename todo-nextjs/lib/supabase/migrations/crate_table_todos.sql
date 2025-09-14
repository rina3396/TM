-- UUID生成で使う拡張（既に有効ならスキップされます）
create extension if not exists pgcrypto;

-- テーブル
create table if not exists public.todos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  description text,
  done        boolean not null default false,
  inserted_at timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- updated_at を自動更新するトリガー
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_todos_updated_at on public.todos;
create trigger trg_todos_updated_at
before update on public.todos
for each row execute function public.set_updated_at();

-- よく使う検索向けのインデックス
create index if not exists idx_todos_user_id      on public.todos(user_id);
create index if not exists idx_todos_inserted_at  on public.todos(inserted_at desc);
create index if not exists idx_todos_done         on public.todos(done);
