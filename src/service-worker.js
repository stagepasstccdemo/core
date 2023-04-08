importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst()
);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("@stagepass").then((cache) => {
      return cache.addAll(["index.html", "script.js", "style.css"]);
    })
  );
});
