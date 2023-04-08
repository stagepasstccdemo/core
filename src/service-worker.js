importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"
);

workbox.routing.registerRoute(
  /\.(?:css|js|html)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "@stagepass-static",
    plugings: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 1800, // 30 minutes
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "@stagepass-images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 1000,
        maxAgeSeconds: 1800, // 30 minutes
      }),
    ],
  })
);
