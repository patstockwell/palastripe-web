const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all the assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/sw-template.js',
    swDest: 'build/sw.js', // this is the final service worker file output
    globDirectory: 'build',
    globPatterns: [
      '**\/**\/*.{js,css,png,woff2,xml,ico,json,jpg,mp3}',
      'index.html',
    ],
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  });
};
buildSW();
