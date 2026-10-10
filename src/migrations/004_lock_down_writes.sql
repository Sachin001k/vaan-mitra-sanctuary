-- 004_lock_down_writes.sql
-- Replaces the open policies from 001-003: anyone can read, only signed-in users (the admin) can write.
-- Before running: create the admin user (Authentication > Users > Add user) and turn off
-- public sign-ups (Authentication > Sign In / Providers > "Allow new users to sign up"),
-- otherwise anyone could sign up and get write access. Safe to run more than once.

-- ---------- blogs table ----------
alter table public.blogs enable row level security;

drop policy if exists allow_public_select_blogs on public.blogs;
drop policy if exists allow_admin_insert_blogs on public.blogs;
drop policy if exists allow_admin_update_blogs on public.blogs;
drop policy if exists allow_service_delete_blogs on public.blogs;
drop policy if exists "Allow public read access to blogs" on public.blogs;
drop policy if exists "Allow public insert to blogs" on public.blogs;
drop policy if exists "Allow public update to blogs" on public.blogs;
drop policy if exists blogs_public_read on public.blogs;
drop policy if exists blogs_admin_insert on public.blogs;
drop policy if exists blogs_admin_update on public.blogs;
drop policy if exists blogs_admin_delete on public.blogs;

create policy blogs_public_read on public.blogs
  for select using (true);

create policy blogs_admin_insert on public.blogs
  for insert to authenticated with check (true);

create policy blogs_admin_update on public.blogs
  for update to authenticated using (true) with check (true);

create policy blogs_admin_delete on public.blogs
  for delete to authenticated using (true);

-- ---------- blog-images bucket ----------
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists allow_public_read_blog_images on storage.objects;
drop policy if exists allow_upload_blog_images on storage.objects;
drop policy if exists allow_delete_blog_images on storage.objects;
drop policy if exists "Allow public read access to blog-images" on storage.objects;
drop policy if exists "Allow public upload to blog-images" on storage.objects;
drop policy if exists "Allow public update to blog-images" on storage.objects;
drop policy if exists blog_images_public_read on storage.objects;
drop policy if exists blog_images_admin_insert on storage.objects;
drop policy if exists blog_images_admin_update on storage.objects;
drop policy if exists blog_images_admin_delete on storage.objects;

create policy blog_images_public_read on storage.objects
  for select using (bucket_id = 'blog-images');

create policy blog_images_admin_insert on storage.objects
  for insert to authenticated with check (bucket_id = 'blog-images');

create policy blog_images_admin_update on storage.objects
  for update to authenticated using (bucket_id = 'blog-images');

create policy blog_images_admin_delete on storage.objects
  for delete to authenticated using (bucket_id = 'blog-images');
