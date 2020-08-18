if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|mp3|svg|woff2|ico)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'assets',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 160,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    workbox.routing.registerRoute(
      /\.(?:css|js|json|xml)$/,
      new workbox.strategies.NetworkFirst({
        networkTimeoutSeconds: 3,
        cacheName: 'source-files',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 160,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    // only cache the index page
    workbox.routing.registerRoute(
      new RegExp('/'),
      new workbox.strategies.NetworkFirst({
        networkTimeoutSeconds: 3,
        cacheName: 'slash',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    workbox.precaching.precacheAndRoute([], {
      // Ignore all URL parameters for precaching
      ignoreURLParametersMatching: [/.*/]
    });
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
