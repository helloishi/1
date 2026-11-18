const CACHE = "report-it-v1";
const SHELL = ["./", "index.html", "app.css", "app.js", "manifest.webmanifest", "icon.svg",
  "../shared/civic.css", "../shared/civic.js", "data/channels.json", "../shared/data/stations.json"];
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
