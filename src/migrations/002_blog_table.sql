-- 002_blog_table.sql
-- Creates the blogs metadata table and exposes policies for the admin UI.

create extension if not exists "pgcrypto";

create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text generated always as (lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'))) stored unique,
  description text not null,
  topic text not null,
  tags text[] not null default '{}',
  minute_read integer not null default 5,
  published_at timestamptz not null default now(),
  image_url text,
  image_path text,
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blogs enable row level security;

do $$
begin
  if not exists(
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'blogs'
      and policyname = 'allow_public_select_blogs'
  ) then
    create policy allow_public_select_blogs
      on public.blogs
      for select
      using (true);
  end if;
end$$;

do $$
begin
  if not exists(
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'blogs'
      and policyname = 'allow_admin_insert_blogs'
  ) then
    create policy allow_admin_insert_blogs
      on public.blogs
      for insert
      with check (auth.role() in ('authenticated','anon'));
  end if;
end$$;

do $$
begin
  if not exists(
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'blogs'
      and policyname = 'allow_admin_update_blogs'
  ) then
    create policy allow_admin_update_blogs
      on public.blogs
      for update
      using (auth.role() in ('authenticated','anon'))
      with check (auth.role() in ('authenticated','anon'));
  end if;
end$$;

do $$
begin
  if not exists(
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'blogs'
      and policyname = 'allow_service_delete_blogs'
  ) then
    create policy allow_service_delete_blogs
      on public.blogs
      for delete
      using (auth.role() = 'service_role');
  end if;
end$$;
