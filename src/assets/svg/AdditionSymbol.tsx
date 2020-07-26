import React, { CSSProperties } from 'react';

export const AdditionSymbol = ({ style }: { style?: CSSProperties }) => (
  <svg role="img" viewBox='0 0 20 20' width='20' height='20' style={style}>
    <rect y='8' width='20' height='4'/>
    <rect x='8' height='20' width='4'/>
  </svg>
);
