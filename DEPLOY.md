# Deploy to Vercel (Free)

This repository builds a Vite + TanStack Start app that produces a static client in `.output/public`.

Quick steps to deploy:

1. Locally verify build:

```bash
npm ci
npm run build
npx vite preview
```

2. Commit and push changes to your GitHub repository. Example:

```bash
git add .
git commit -m "ci: add vercel config and deploy docs"
git push origin main
```

3. On Vercel:
- Create a new project and import from GitHub (choose `niangimario/discover-aifinder`).
- In Project Settings > Build & Output Settings, ensure Build Command is `npm run build` and Output Directory is `.output/public`.
- Alternatively, Vercel will use `vercel.json` which sets `distDir` to `.output/public`.

4. Deploy. Vercel will run `npm run build` and serve the generated `.output/public` as a static site.

Notes:
- This repo includes SSR files (`src/server.ts`, `src/start.ts`) but the site is deployed as a static SPA to fit Vercel's free hosting. If you need SSR on Vercel, consider a paid plan or a different adapter.
- If push fails due to auth, run the `git remote add origin` step shown in the repo UI and authenticate via Git.
