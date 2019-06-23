import React from 'react';

export const SkinnyAdditionSymbol = ({ style }) => (
  <svg viewBox='0 0 54 54' style={style}>
    <rect y='25' width='54' height='4'/>
    <rect x='25' height='54' width='4'/>
  </svg>
);

const AdditionSymbol = ({ fill }) => (
  <svg viewBox='0 0 42 42' width='20' height='20' fill={fill}>
    <polygon points='42,16 26,16 26,0 16,0 16,16 0,16 0,26 16,26 16,42 26,42 26,26 42,26 '/>
  </svg>
);

export default AdditionSymbol;

