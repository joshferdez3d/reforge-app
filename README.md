# Reforge 🔥

Personal health transformation app for Nishant & Mrunali.

## Quick Start (Local)

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Deploy to Vercel (Get a URL for your phones)

### Option 1: Vercel CLI (fastest)
```bash
npm i -g vercel
vercel login
vercel
```
Follow the prompts. You'll get a URL like `reforge-xxxx.vercel.app`.

### Option 2: GitHub + Vercel (auto-deploys on changes)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework: Vite → Deploy

## Add to Phone Home Screen

Once deployed, open the URL on your phone:

**iPhone:**
1. Open the URL in Safari
2. Tap the Share button (square with arrow)
3. Tap "Add to Home Screen"
4. Tap "Add"

**Android:**
1. Open the URL in Chrome
2. Tap the three-dot menu
3. Tap "Add to Home screen"
4. Tap "Add"

It will look and feel like a native app — full screen, no browser bar.

## How It Works

- **Two profiles**: Switch between Nishant and Mrunali at the top
- **Each profile has its own data** stored in the browser's localStorage
- **Data is per-device** — your phone keeps your data, her phone keeps hers
- Mrunali's profile includes cycle tracking with phase-aware exercise/nutrition guidance
