import React from 'react';

export const SkinnyAdditionSymbol = ({ style }) => (
  <svg role="img" viewBox='0 0 54 54' style={style}>
    <rect y='25' width='54' height='4'/>
    <rect x='25' height='54' width='4'/>
  </svg>
);

const AdditionSymbol = ({ style }) => (
  <svg role="img" viewBox='0 0 20 20' width='20' height='20' style={style}>
    <rect y='8' width='20' height='4'/>
    <rect x='8' height='20' width='4'/>
  </svg>
);

export default AdditionSymbol;
