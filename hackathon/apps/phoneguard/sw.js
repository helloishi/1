const CACHE = "phoneguard-v1";
const SHELL = ["./", "index.html", "app.css", "app.js", "manifest.webmanifest", "icon.svg",
  "../shared/civic.css", "../shared/civic.js", "data/stolen-steps.json", "data/checklist.json",
  "../shared/vendor/leaflet/leaflet.js", "../shared/vendor/leaflet/leaflet.css"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting())));
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const sameOrigin = url.origin === location.origin;
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !fonts) return; // live APIs and map tiles go straight to the network
  e.respondWith(caches.match(e.request).then((hit) => {
    const net = fetch(e.request).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res; });
    return hit || net;
  }).catch(() => caches.match("index.html")));
});
