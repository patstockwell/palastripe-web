import React from 'react';

export const DownloadArrow = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={{ ...style }} viewBox="0 0 512 512">
    <path d="M472,313v139c0,11.028-8.972,20-20,20H60c-11.028,0-20-8.972-20-20V313H0v139c0,33.084,26.916,60,60,60h392
      c33.084,0,60-26.916,60-60V313H472z"/>
    <polygon points="352,235.716 276,311.716 276,0 236,0 236,311.716 160,235.716 131.716,264 256,388.284 380.284,264    "/>
  </svg>
);
