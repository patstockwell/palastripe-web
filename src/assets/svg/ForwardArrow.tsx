import React from 'react';

interface Props {
  style: any;
}

const ForwardArrow: React.FC<Props> = ({ style }) => (
  <svg role="img" style={style} viewBox='0 0 240 240' width='20' height='20'>
    <g>
      <path d='M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
    l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
    C187.881,124.315,187.881,116.495,183.189,111.816z'/>
    </g>
  </svg>
);

export default ForwardArrow;

