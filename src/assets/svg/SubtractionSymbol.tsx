import React from 'react';

interface Props {
  fill?: string;
}

const SubtractionSymbol: React.FC<Props> = ({ fill = 'black' }) => (
  <svg viewBox='0 0 42 42' width='20' height='20' fill={fill}>
    <rect y='16' width='42' height='10'/>
  </svg>
);

export default SubtractionSymbol;
