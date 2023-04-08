importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"
);

const CACHE_NAME = "@stagepass/cache";

const { precacheAndRoute } = workbox.precaching;

precacheAndRoute([{ url: "/index.html", revision: "1" }]);

const { registerRoute } = workbox.routing;

const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;

workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://stagepasstickets.com",
  new NetWorkFirst({
    cacheName: CACHE_NAME,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
