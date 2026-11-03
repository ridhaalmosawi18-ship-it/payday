const C='payday-v5';
// Only public files are pre-cached. Every other page is cached the first time it is opened.
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['icon-192.png','icon-512.png','chores-192.png','chores-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
