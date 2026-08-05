-- 001_storage_bucket.sql
-- Creates the public bucket that holds blog hero imagery and a lightweight policy surface for uploads.

-- This migration assumes the `blog-images` bucket already exists. Create it manually via the Supabase dashboard or `supabase storage createBucket('blog-images', { public: true })`.
alter table if exists storage.objects enable row level security;

do $$
begin
  if not exists(
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'allow_public_read_blog_images'
  ) then
    create policy allow_public_read_blog_images
      on storage.objects
      for select
      using (bucket_id = 'blog-images');
  end if;
end$$;

do $$
begin
  if not exists(
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'allow_upload_blog_images'
  ) then
    create policy allow_upload_blog_images
      on storage.objects
      for insert
      with check (bucket_id = 'blog-images' and auth.role() in ('authenticated','anon'));
  end if;
end$$;

do $$
begin
  if not exists(
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'allow_delete_blog_images'
  ) then
    create policy allow_delete_blog_images
      on storage.objects
      for delete
      using (bucket_id = 'blog-images' and auth.role() = 'service_role');
  end if;
end$$;
