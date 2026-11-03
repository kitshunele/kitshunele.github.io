/* KitShun FS Checklist SW */
const C='fsapp20259005-v0.6.481-h2-partb-range2-cont';
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./ss_items.json'])).then(() => self.skipWaiting()); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(caches.open(C).then(async c => {
    try {
      const net = await fetch(e.request);
      if (net && net.ok) c.put(e.request, net.clone());
      return net;
    } catch (err) {
      const hit = await c.match(e.request);
      return hit || c.match('./index.html');
    }
  }));
});
