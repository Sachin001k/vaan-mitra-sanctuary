# Welcome to the Vann Mitra Sanctuary web project

## Project info

**URL**: https://vaanmitra.org

## How can I edit this code?

There are several ways to work on the site. Pick whichever fits your workflow:

**Edit locally**

1. Clone the repository: `git clone <YOUR_GIT_URL>`
2. Enter the project directory: `cd <YOUR_PROJECT_NAME>`
3. Install dependencies: `npm install`
4. Run the dev server with automatic reloads: `npm run dev`

**Edit directly on GitHub**

- Navigate to the file you want to change.
- Click the pencil icon to edit the file in the browser.
- Commit the change to a new branch or the default branch.
- Push the branch and open a pull request when you are ready to merge.

**Use GitHub Codespaces**

- Open the repository on GitHub and click the **Code** button.
- Switch to the **Codespaces** tab and create a new environment.
- Inside the Codespace, use the same local workflow steps above.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Build the production bundle with `npm run build` and deploy the contents of the `dist/` directory to your preferred static host (Netlify, Vercel, GitHub Pages, etc.). Most hosts detect Vite projects automatically, but you can always upload the files manually or connect your git repository.

## Can I connect a custom domain?

Yes. Set up your custom domain through your hosting provider, point the domain's DNS records (A, CNAME, or ALIAS) to the host, and enable HTTPS per the host's instructions. Once DNS propagation finishes, update the host configuration to serve the site from your custom domain.

## Supabase & Admin tooling

### Environment

- Copy `.env.example` to `.env.local` (or `.env`) before running the project.
- Set `VITE_SUPABASE_URL` to `https://nadkgbtjgklwyzpqkkuw.supabase.co` and `VITE_SUPABASE_ANON_KEY` to the anon key issued for that Supabase project (the value you provided when requesting this change). Keeping these values inside an env file keeps them out of version control, and `src/lib/supabaseClient.ts` will throw a clear error if either value is missing.

### Database & storage

- The SQL files under `src/migrations` create the `blog-images` bucket plus the `public.blogs` table with the policies the admin UI relies on.
- Supabase SQL cannot call `storage.create_bucket`, so create the `blog-images` bucket manually (dashboards/CLI) before pushing the migration; the SQL files only configure the bucket policies and metadata table.
- Apply them through the Supabase CLI (`supabase db push --file src/migrations/001_storage_bucket.sql` followed by `supabase db push --file src/migrations/002_blog_table.sql`) or paste them straight into the SQL editor in the Supabase dashboard.
- The bucket is public so the UI can read the uploaded cover image URL, while RLS allows the anon role to upload and select rows and requires the service role for deletes.

### Admin panel (`/admin`)

- A new `/admin` route is linked from the navigation bar (`src/components/Navigation.tsx`) and renders `src/pages/AdminPage.tsx`.
- The panel is built with `react-hook-form` + `zod`, shows a hero section, and exposes the form fields you requested: title, topic, tags, description, publish date+time, estimated read time, and the cover image dropzone.
- Drag & drop (or click to pick) uploads the image into the `blog-images` bucket before inserting metadata into the `blogs` table. Toasts provide success/failure feedback, and the dropzone previews the selected file.
- The `/blog` listing now streams live rows from Supabase and opens each story in a lightweight detail view (`/blog/:slug`) so the public site always reflects the latest entries you create via the admin studio.
