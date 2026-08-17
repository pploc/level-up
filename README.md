# Level Up - Gamified Habit Tracker

"Level Up" is a client-side gamified habit tracking web application with streak tracking, 52-week GitHub-style contribution heatmaps, analytics, and an evolving vector mascot ("Ignis").

## Tech Stack
- **Frontend**: Vite + React 18 + TypeScript + Tailwind CSS
- **Design System**: Dark-mode first (Black `#000000`/`#0D0D0D`, White `#FFFFFF`, Flame Orange `#FF5722`/`#FF7A00`)
- **Effects & Icons**: `canvas-confetti`, `lucide-react`
- **Data & Sync**: LocalStorage primary + Cloudflare Worker R2 bridge (`worker/src/index.ts`) + JSON backup/restore
- **Hosting**: GitHub Pages (`.github/workflows/deploy.yml`)

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Compile TypeScript and build production bundle
npm run build

# Preview build
npm run preview
```

## Cloudflare Worker R2 Sync

```bash
cd worker
npx wrangler deploy
```
