-- 005_publish_status_and_stable_slugs.sql
-- 1. The public blog now shows only status = 'published'; publish the posts that already exist.
-- 2. Slugs were regenerated from the title on every edit and duplicate titles failed to save.
--    Now the slug is set once when a post is created, with -2, -3... added if it is taken.
-- Run this BEFORE deploying the matching code, or existing posts disappear from /blog. Safe to run more than once.

update public.blogs set status = 'published' where status = 'draft';

alter table public.blogs alter column slug drop expression if exists;

create or replace function public.set_blog_slug()
returns trigger
language plpgsql
as $$
declare
  base text;
  candidate text;
  n integer := 1;
begin
  if new.slug is not null and new.slug <> '' then
    return new;
  end if;

  base := trim(both '-' from lower(regexp_replace(new.title, '[^a-zA-Z0-9]+', '-', 'g')));
  if base = '' then
    base := 'story';
  end if;

  candidate := base;
  while exists (select 1 from public.blogs where slug = candidate) loop
    n := n + 1;
    candidate := base || '-' || n;
  end loop;

  new.slug := candidate;
  return new;
end;
$$;

drop trigger if exists blogs_set_slug on public.blogs;
create trigger blogs_set_slug
  before insert on public.blogs
  for each row execute function public.set_blog_slug();
