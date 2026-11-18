# Building a London Civic Hack prototype — rules for every team

Read this fully before writing code. Your app lives in `hackathon/apps/<your-app>/`. You may only create or edit files inside your own folder. Do not touch other folders, `shared/`, or anything outside `hackathon/apps/<your-app>/`. Do not run git.

## 1. What we are building

A free, installable **mobile web app (PWA)** for Londoners and visitors. It is a hackathon prototype, but it must work for real: real open data where the spec says so, honest offline states, no fake data.

- Vanilla HTML/CSS/JS. No frameworks, no build step, no npm installs.
- Phone-first (360–430 px wide), and it must still look right on desktop (the shared `.app` column caps width at 560 px).
- Light and dark themes come from the shared tokens. Use tokens only (`var(--ink)`, `var(--surface)`…), never literal colors that only work in one theme.
- English UI (target users are in London). Some specs ask for extra languages on specific screens.

## 2. Shared kit (already written; read both files)

- `../shared/civic.css`: tokens and components: `.plate` street-plate header, `.card`, `.btn*`, `.chip`, `.pill.ok|warn|bad|info|neutral`, `.list`/`.row`, `.banner.*`, `.sos` emergency strip, `.field`/`.input`, `.checklist`/`.check`, `.steps` (numbered, only for real sequences), `.tabbar`/`.tab`, `.sheet`, `.toast`, `.map`, `.copyline`, `.foot`, `.big-number`, utilities `.stack`, `.cluster`, `.spread`.
- `../shared/civic.js` exposes `window.Civic`: `el()`, `$`, `$$`, `esc`, `store` (safe localStorage), `fetchJSON(url,{timeout})`, `cached(key, maxAgeMs, loader)`, `local(path)`, `geo()`, `inLondon()`, `distanceM()`, `fmtDistance()`, `walkMins()`, `londonNow()`, `relTime()`, `toast()`, `copy()`, `watchOnline()`, `prefs` (theme + text size), `tabs(views, fallback, onChange)` (hash views: use plain `#name` only), `registerSW()`, `i18n()`, `icon(name)`.
- `../shared/vendor/leaflet/` (Leaflet 1.9.4) if your spec needs a map.
- `../shared/data/stations.json`: real TfL station topology (509 stations, 20 lines: tube, DLR, Elizabeth line, the six named Overground lines, tram) with NaPTAN ids and line membership. No coordinates.

You may add app-specific CSS in `app.css`, but build on the kit: the street plate header, typography and tokens give all five apps one family look.

## 3. Page template

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>App Name</title>
<meta name="description" content="One sentence.">
<meta name="theme-color" content="#F2F4F5" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0C1013" media="(prefers-color-scheme: dark)">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:wght@400;700&display=swap">
<link rel="stylesheet" href="../shared/civic.css">
<link rel="stylesheet" href="app.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<main id="main" class="app">
  <header class="plate">
    <div><h1>App Name</h1><p class="plate-sub">Short promise</p></div>
    <span class="district">W1</span>
  </header>
  <!-- views: <section id="view-home">…</section> etc., switched with Civic.tabs -->
</main>
<div class="tabbar"><nav aria-label="Sections"><!-- <a class="tab" href="#home" data-tab="home">…</a> --></nav></div>
<script src="../shared/civic.js"></script>
<script src="app.js"></script>
</body>
</html>
```

The `.district` tag is a real London postcode district that fits the app (the spec gives it). It is the signature detail of the family look.

## 4. Files to create

```
index.html
app.css
app.js
data/*.json            curated content (only facts you are sure of; see section 6)
manifest.webmanifest   name, short_name, start_url "./", display "standalone", background_color, theme_color,
                       icons: icon-192.png and icon-512.png (PNG files are generated later by the lead; just reference them) + icon.svg
icon.svg               512×512 viewBox, simple: a rounded street-plate shape with the app's initials or a glyph; uses #C62B33 and #101418 on white
sw.js                  offline cache for the app shell, shared kit and data (template below)
README.md              English: problem + evidence (numbers with sources), who it helps, features, data sources, privacy, limits, "To verify before launch" list
```

Service worker template (adapt CACHE name and SHELL list):

```js
const CACHE = "APPNAME-v1";
const SHELL = ["./", "index.html", "app.css", "app.js", "manifest.webmanifest", "icon.svg",
  "../shared/civic.css", "../shared/civic.js" /*, "data/x.json" */];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const sameOrigin = url.origin === location.origin;
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !fonts) return; // live APIs go straight to the network
  e.respondWith(caches.match(e.request).then((hit) => {
    const net = fetch(e.request).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res; });
    return hit || net;
  }).catch(() => caches.match("index.html")));
});
```

Call `Civic.registerSW("sw.js")` from app.js. It silently does nothing where service workers are not allowed.

## 5. Live data, offline and blocked states

- Live APIs are called **from the user's browser** (they support CORS). Always use `Civic.fetchJSON` with a timeout, and `Civic.cached` where a recent answer is fine.
- Every live feature needs three designed states: loading, success, and unavailable. Unavailable says plainly what is missing and what still works ("Live lift status needs a connection. Station facilities below are saved on your phone."). Never show sample or invented data in place of live data.
- Geolocation is optional. If refused or unavailable, offer a manual choice (postcode, station or area picker). Never block the app on location.
- The app may also be opened inside a locked-down frame where external fetches, geolocation and service workers are refused. The offline core must still be useful there.
- **This build container cannot reach external hosts** (TfL, police.uk, postcodes.io, Open-Meteo, Google Fonts are all blocked here). That is expected. Your screenshots will show fallback fonts and the "unavailable" states. Test parsers with small synthetic fixtures via Playwright `page.route` or unit tests, but never ship fixtures, never put fixture data into `data/`, and never present fixture output as real.

## 6. Accuracy rules (most important)

These apps give people phone numbers, prices and safety advice. Wrong facts can hurt someone.

1. Use the facts in your spec. Each one has been checked or is marked as uncertain.
2. Add other facts only if you are highly confident they are stable and current (for example: 999, NHS 111). Otherwise either leave them out, link to the organisation's official home page, or mark them in the UI as "check before you go". List every such item under **To verify before launch** in your README.
3. Never invent statistics, prices, phone numbers, opening hours, or URLs with deep paths you are not sure of. A top-level official domain link (`https://www.met.police.uk`) is better than a guessed deep link.
4. Evidence numbers in About screens and the README must carry their source and year exactly as given in the spec.
5. Safety copy: calm, practical, never fear-mongering. Never label a street or area "dangerous". Always offer 999 for emergencies.

## 7. Accessibility and privacy (judged)

- WCAG 2.2 AA: real `<button>`/`<a>` elements, labels on inputs, visible focus, `aria-live="polite"` on regions that update, alt text, 48 px targets, `lang`/`dir` on translated blocks (`dir="rtl"` for Arabic).
- A settings sheet with theme (Auto / Light / Dark) and text size (Standard / Large / Extra large) via `Civic.prefs.set({theme, size})`. Same pattern in every app.
- Plain English, short sentences, active voice. Buttons say exactly what happens.
- Privacy: no accounts, no analytics, no cookies, no third-party trackers. Location is used on the device only. Say so in About.
- Footer on About: "Prototype from London Civic Hack 2026. Not affiliated with TfL, the Mayor of London, the Metropolitan Police or the NHS." plus data attributions your app uses: "Powered by TfL Open Data" · "Contains public sector information licensed under the Open Government Licence v3.0" (police.uk) · "Weather data by Open-Meteo.com (CC BY 4.0)" · "© OpenStreetMap contributors" · "Postcode lookup by postcodes.io".

## 8. Testing (required before you finish)

1. Serve the apps folder on your assigned port: `cd /home/user/1/hackathon/apps && python3 -m http.server <PORT>` (run it in the background and stop it when done).
2. Write a small Playwright script **in the scratchpad** (`/tmp/claude-0/-home-user-1/c57dbfe7-74ac-5399-bde4-5208b03bc729/scratchpad/<your-app>/`), not in the repo. `require('playwright')` works from any directory and `chromium.launch()` needs no options. Do not install Playwright.
3. Open `http://127.0.0.1:<PORT>/<your-app>/` at 390×844, deviceScaleFactor 1, in light and in dark (`colorScheme`). Visit every view (via `#hash`). Collect console errors and page errors. Fix every error that is caused by your code (network errors to blocked external hosts are expected).
4. Check there is no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`).
5. Take screenshots into the scratchpad and look at them with the Read tool. Fix layout problems you see.

## 9. Your final message

Under 200 words: what works offline, what needs live data, what you could not verify, and the list of files you created.
