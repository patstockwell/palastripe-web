import React, { CSSProperties } from 'react';
import { green, purple, blue } from '../../helpers/constants';

export const ThreeBars = ({ style }: { style?: CSSProperties }) => (
  <svg viewBox='0 0 24 24' width='20' height='20' style={style}>
    <rect fill={purple} width='24' height='6' x='0' y='0'/>
    <rect fill={blue} width='24' height='6' x='0' y='9'/>
    <rect fill={green} width='24' height='6' x='0' y='18'/>
  </svg>
);
