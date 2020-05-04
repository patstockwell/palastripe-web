import React, { CSSProperties } from 'react';

const defaultStyle = {
  fill: 'white',
};

// https://www.flaticon.com/authors/fjstudio
export const LightningBolt = ({ style }: { style?: CSSProperties }) => (
  <svg height="20" viewBox="0 0 192 192" width="20" style={style || defaultStyle} xmlns="http://www.w3.org/2000/svg">
    <path d="m158.612 76.1a8 8 0 0 0 -6.983-4.1h-47.838l8.193-62.6a8 8 0 0 0 -14.747-5.232l-63.728 103.642a8 8 0 0 0 6.815 12.19h47.052l-7.363 62.7a8 8 0 0 0 14.762 5.121l63.671-103.63a8 8 0 0 0 .166-8.091zm-58.476 72.433 4.18-35.595a8 8 0 0 0 -7.945-8.938h-41.736l36.628-59.569-4.519 34.531a8 8 0 0 0 7.932 9.038h42.649z"/>
</svg>
);
