# Welcome to the Vaan Mitra Sanctuary web project

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
