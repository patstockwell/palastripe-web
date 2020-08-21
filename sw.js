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

    workbox.precaching.precacheAndRoute([
  {
    "url": "asset-manifest.json",
    "revision": "f6a48b607968692f9842d0afd0b11dff"
  },
  {
    "url": "browserconfig.xml",
    "revision": "877c532bc5e11b01391e51b4fd9240e8"
  },
  {
    "url": "c-android-chrome-192x192.png",
    "revision": "97fb70d52a01ea32220f4153e207bb49"
  },
  {
    "url": "c-android-chrome-512x512.png",
    "revision": "1a35a5004ac0c5874ad3c345a5d21705"
  },
  {
    "url": "c-favicon-16x16.png",
    "revision": "2fa187438af623fced9df9621ec4f247"
  },
  {
    "url": "c-favicon-32x32.png",
    "revision": "6152586b7728b6a692bd794fedc45ed2"
  },
  {
    "url": "c-favicon.ico",
    "revision": "734276dfc292488b224d26e271ee1186"
  },
  {
    "url": "manifest.json",
    "revision": "bcbe38b6dcd83e96a1e776560f3bae44"
  },
  {
    "url": "mstile-144x144.png",
    "revision": "c2f9706d78fbf172849ef060040f543b"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "ba1904d3d1b41170f083ab8af5ac5e43"
  },
  {
    "url": "mstile-310x150.png",
    "revision": "a85aee874f3e3e6daef2ddbf18ee3c92"
  },
  {
    "url": "mstile-310x310.png",
    "revision": "71e4ce259fdc44b864a5d9c967d09363"
  },
  {
    "url": "mstile-70x70.png",
    "revision": "d1a2bde2ca327aa23b774ad17a787732"
  },
  {
    "url": "og-image.jpg",
    "revision": "8bf17e67efa74e53dd954b3144eb73aa"
  },
  {
    "url": "splashscreens/ipad_splash.png",
    "revision": "4fa29cd487eacbf33e5f6a3e1380aa63"
  },
  {
    "url": "splashscreens/ipadpro1_splash.png",
    "revision": "7701264ac97f4da615d8bb84583bc1df"
  },
  {
    "url": "splashscreens/ipadpro2_splash.png",
    "revision": "00612d1048d3e8c8e787bc5d90b3ceb4"
  },
  {
    "url": "splashscreens/ipadpro3_splash.png",
    "revision": "1f9690cda867765646596ee6b316252c"
  },
  {
    "url": "splashscreens/iphone5_splash.png",
    "revision": "76b762f91dea12f3dd37bf75766c7ca1"
  },
  {
    "url": "splashscreens/iphone6_splash.png",
    "revision": "eb5309b921f57b68ee72444b49e28b6a"
  },
  {
    "url": "splashscreens/iphoneplus_splash.png",
    "revision": "81c057bd2b16e427a98e9e28cb62caf9"
  },
  {
    "url": "splashscreens/iphonex_splash.png",
    "revision": "e5fd2ba376ad8afaeb0fcf4c17d19bf4"
  },
  {
    "url": "splashscreens/iphonexr_splash.png",
    "revision": "b00ade9c6ae407e8e3fe8bfb02e5f30b"
  },
  {
    "url": "splashscreens/iphonexsmax_splash.png",
    "revision": "c589cd31557de9636d1449a8aa97e503"
  },
  {
    "url": "static/js/2.65bf13db.chunk.js",
    "revision": "81d3a44e7ee4a89d5852cf2bbb21a1c7"
  },
  {
    "url": "static/js/main.1d91a5c8.chunk.js",
    "revision": "86574d6067fb988b8383f5d7e875f431"
  },
  {
    "url": "static/js/runtime~main.a8a9905a.js",
    "revision": "238c9148d722c1b6291779bd879837a1"
  },
  {
    "url": "static/media/active-adult-aerobics-206573.57b9cb6b.jpg",
    "revision": "57b9cb6b33890ec338d2db1581fff963"
  },
  {
    "url": "static/media/active-athlete-barbell-2261482.c4693443.jpg",
    "revision": "c4693443874b987a6b91c77cfb925d89"
  },
  {
    "url": "static/media/active-body-crossfit-1533897.4fc94c9d.jpg",
    "revision": "4fc94c9d9a9057aa2d37373d5beb6cc0"
  },
  {
    "url": "static/media/activityEnd.b3398441.mp3",
    "revision": "b339844139069d94ae9154b9da08f541"
  },
  {
    "url": "static/media/activityStart.291d2235.mp3",
    "revision": "291d22350460cfa323932859e0dd6312"
  },
  {
    "url": "static/media/athlete-barbell-biceps-497934.78ed658d.jpg",
    "revision": "78ed658dcbd811876db0ec717dcadde2"
  },
  {
    "url": "static/media/athlete-barbell-body-931321.358d0420.jpg",
    "revision": "358d0420ab95a9e45e0ab244029dc43a"
  },
  {
    "url": "static/media/athlete-biceps-body-136405.02196806.jpg",
    "revision": "02196806eefae897e68b996b70900950"
  },
  {
    "url": "static/media/benchpress.0d697d4c.jpg",
    "revision": "0d697d4ca38d3d5780e43d9b6ebf0241"
  },
  {
    "url": "static/media/bicep-workout-1851820.a44045de.jpg",
    "revision": "a44045de43fa4aa1fbad9df2d658dea3"
  },
  {
    "url": "static/media/custom-workout-image.6bbed9b0.jpg",
    "revision": "6bbed9b0e39a53bb4016545aa0c8f8f1"
  },
  {
    "url": "static/media/leg-press-dark.122eed84.jpg",
    "revision": "122eed84b64b92dec52ce5105d04f981"
  },
  {
    "url": "static/media/muli.c99bf4eb.woff2",
    "revision": "c99bf4ebc8f56d7492cfc7678495e140"
  },
  {
    "url": "static/media/overhead-press.3e8e7eac.jpg",
    "revision": "3e8e7eacb568a81d8c8d66f33059b8a2"
  },
  {
    "url": "static/media/squat.38f6e29e.jpg",
    "revision": "38f6e29ea991a9e0b8b0a2d349518d3c"
  },
  {
    "url": "touch-icons/c-apple-touch-icon-114x114.png",
    "revision": "e8f0a0a00ba7455d18c2cb4d1399b7d8"
  },
  {
    "url": "touch-icons/c-apple-touch-icon-120x120.png",
    "revision": "efbf912006a1f59c68be6fa3e447af1c"
  },
  {
    "url": "touch-icons/c-apple-touch-icon-144x144.png",
    "revision": "ee11f1e274729148f27c73b3b2dc1140"
  },
  {
    "url": "touch-icons/c-apple-touch-icon-152x152.png",
    "revision": "3c142bc79aea9e76bc2e3f677be8ee0f"
  },
  {
    "url": "touch-icons/c-apple-touch-icon-180x180.png",
    "revision": "5d7f4ebee370017c86127550eac668bc"
  },
  {
    "url": "touch-icons/c-apple-touch-icon-57x57.png",
    "revision": "aba6e060ccc3f3f5355de7436f4a3de6"
  },
  {
    "url": "touch-icons/c-apple-touch-icon-72x72.png",
    "revision": "502034ff70a8af3e6893d6ab3d88511f"
  },
  {
    "url": "touch-icons/c-apple-touch-icon-76x76.png",
    "revision": "0ba6fddd679bdce020fff16a2b3b4787"
  },
  {
    "url": "touch-icons/c-apple-touch-icon.png",
    "revision": "b28e00abbc31ef556dae8ce468df5c1f"
  },
  {
    "url": "index.html",
    "revision": "e9ec587400fcd3f2ba942c7a8c68a88f"
  }
], {
      // Ignore all URL parameters for precaching
      ignoreURLParametersMatching: [/.*/]
    });
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
