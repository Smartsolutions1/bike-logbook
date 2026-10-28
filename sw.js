// Bike Logbook offline support.
// Online: always load the newest app from the network (bypassing the browser cache).
// Offline: fall back to the last saved copy.
const CACHE = "bike-logbook-1.5";
const CORE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(CORE.map(u => fetch(new Request(u, {cache: "reload"})).then(r => r.ok && c.put(u, r)).catch(() => {}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const sameOrigin = new URL(req.url).origin === self.location.origin;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    try {
      const r = await fetch(sameOrigin ? new Request(req, {cache: "no-store"}) : req);
      if (r && (r.ok || r.type === "opaque")) c.put(req, r.clone());
      return r;
    } catch (err) {
      return (await c.match(req)) || (req.mode === "navigate" ? await c.match("index.html") : undefined) || Response.error();
    }
  })());
});
