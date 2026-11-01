// Bike Logbook offline support.
// Online: always load the newest app from the network (bypassing the browser cache).
// Offline: fall back to the last saved copy.
// Only the app's own files, the Firebase library files and fonts are cached;
// live data (Firestore, sign-in) is never touched here.
const CACHE = "bike-logbook-3.11";
const CORE = ["./", "index.html", "cloud.js", "ur.js", "firebase-config.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];
const CACHE_HOSTS = ["www.gstatic.com", "fonts.googleapis.com", "fonts.gstatic.com"];
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
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isLib = url.hostname === "www.gstatic.com" && url.pathname.startsWith("/firebasejs/");
  if (!sameOrigin && !isLib && !CACHE_HOSTS.slice(1).includes(url.hostname)) return;
  if (sameOrigin && url.pathname.startsWith("/__/")) return; // Firebase sign-in helper pages
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    if (isLib) { // versioned library files never change: cache first
      const hit = await c.match(req); if (hit) return hit;
      const r = await fetch(req); if (r && (r.ok || r.type === "opaque")) c.put(req, r.clone()); return r;
    }
    try {
      const r = await fetch(sameOrigin ? new Request(req, {cache: "no-store"}) : req);
      if (r && (r.ok || r.type === "opaque")) c.put(req, r.clone());
      return r;
    } catch (err) {
      return (await c.match(req, {ignoreSearch: req.mode === "navigate"})) || (req.mode === "navigate" ? await c.match("index.html") : undefined) || Response.error();
    }
  })());
});

// ---------- reminders ----------
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : "" }; }
  const title = d.title || "Bike Log";
  e.waitUntil(self.registration.showNotification(title, {
    body: d.body || "", icon: "icons/icon-192.png", badge: "icons/icon-192.png",
    tag: d.tag || "bike-log", renotify: true, lang: d.lang || "en", dir: d.lang === "ur" ? "rtl" : "ltr",
    data: { url: d.url || "./" }
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "./", self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) { if (c.url.startsWith(self.registration.scope) && "focus" in c) { c.navigate(url).catch(() => {}); return c.focus(); } }
    return self.clients.openWindow(url);
  }));
});
