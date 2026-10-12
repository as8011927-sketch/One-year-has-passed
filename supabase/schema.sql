-- Supabase Schema for Ziad ❤️ Habiba Romantic Memories PWA
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Memories Table
create table if not exists public.memories (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  caption text,
  memory_date date,
  image_url text not null,
  aspect_ratio text default 'portrait',
  display_order int default 0,
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on memories
alter table public.memories enable row level security;

-- Only authenticated users (or service role) can view memories
create policy "Allow authenticated read on memories"
  on public.memories
  for select
  to authenticated
  using (true);

-- Only authenticated users can insert/update memories
create policy "Allow authenticated write on memories"
  on public.memories
  for all
  to authenticated
  using (true)
  with check (true);

-- 2. Milestones Table
create table if not exists public.milestones (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  milestone_date text not null,
  badge text,
  description text,
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.milestones enable row level security;

create policy "Allow authenticated read on milestones"
  on public.milestones
  for select
  to authenticated
  using (true);

-- 3. Messages Table
create table if not exists public.favorite_messages (
  id uuid default uuid_generate_v4() primary key,
  sender text not null check (sender in ('Ziad', 'Habiba')),
  message_text text not null,
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.favorite_messages enable row level security;

create policy "Allow authenticated read on favorite_messages"
  on public.favorite_messages
  for select
  to authenticated
  using (true);

-- 4. Supabase Storage: Bucket for Private Memories
insert into storage.buckets (id, name, public)
values ('private-memories', 'private-memories', false)
on conflict (id) do nothing;

-- Storage RLS: only authenticated users can download or upload private memory photos
create policy "Allow authenticated access to private-memories bucket"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'private-memories')
  with check (bucket_id = 'private-memories');
