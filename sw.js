importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

const staticAssets = [
    './',
    './styles.css',
    './app.js',
    './fallback.json',
    './images/fallback.jpg'
];

workbox.precaching.precacheAndRoute(staticAssets);

workbox.routing.registerRoute('https://newsapi.org/(.*)', workbox.strategies.networkFirst());

workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/, workbox.strategies.cacheFirst({
    cacheName: 'news-images',
    plugins: [
        new workbox.expiration.Plugin({
            // Cache only 20 images
            maxEntries: 20,
            // Cache for a maximum of a week
            maxAgeSeconds: 7 * 240 * 60 * 60,
        })
    ],
}));