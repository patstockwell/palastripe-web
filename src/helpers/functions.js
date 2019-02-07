export const preventZoom = e => {
  // this function listens for clicks close together and prevents
  // zooming in (the default action on mobile devices for a double tap)
  // https://stackoverflow.com/questions/10614481/disable-double-tap-zoom-option-in-browser-on-touch-devices
  const t2 = e.timeStamp;
  const t1 = e.currentTarget.dataset.lastTouch || t2;
  const dt = t2 - t1;
  const fingers = e.touches.length;
  e.currentTarget.dataset.lastTouch = t2;

  if (!dt || dt > 500 || fingers > 1) return; // not double-tap

  e.preventDefault();
  e.target.click();
};
