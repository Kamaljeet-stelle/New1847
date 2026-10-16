# 1847 Web App

Separate React + TypeScript website for the 1847 grooming lounge.  
Desktop sidebar / phone frame + bottom tabs. Reuses mobile `src/` types, catalog, validation, and `BookingProvider` — mobile screens are not changed.

## Quick start (development)

From the repo root:

```bash
npm run web:app
```

Or:

```bash
cd web-app
npm install
npm run dev
```

Open **http://localhost:5173**

## Production build

```bash
npm run web:app:build
```

Output: `web-app/dist/`

## Share with a friend (same Wi‑Fi)

```bash
npm run web:app:share
```

Then send:

**http://YOUR-IP:5180/**

Find your IP:

```bash
ipconfig getifaddr en0
```

Example: `http://192.168.1.29:5180/`

Keep your Mac awake while they browse. Ask them to hard-refresh (Cmd/Ctrl+Shift+R) if they still see a blank page from an old cache.

### Zip to send

After a build, zip the `dist` folder:

```bash
cd web-app
npm run build
cd dist && zip -r ../1847-website.zip .
```

Friend unzips and runs:

```bash
python3 -m http.server 5180
```

Then opens **http://localhost:5180** (or your LAN IP).

> Do not open `index.html` via `file://` — browsers block the app modules that way.

## API (optional)

Copy `.env.example` to `.env`:

```bash
VITE_API_URL=
```

Leave empty to use local catalog + in-memory bookings. When a backend exists, set the base URL; adapters try HTTP first and fall back to local data.

## Scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview the production build |
| `npm run share` | Build + serve `dist` on port 5180 for LAN sharing |

Root shortcuts: `web:app`, `web:app:build`, `web:app:preview`, `web:app:share`.
