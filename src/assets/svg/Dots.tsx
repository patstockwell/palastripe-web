import React from 'react';

interface Props {
  fill?: string;
}

const Dots: React.FC<Props> = ({ fill = 'black' }) => (
  <svg viewBox='0 0 408 408' width='20' height='20' fill={fill}>
    <path d="M51,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S79.05,153,51,153z M357,153c-28.05,0-51,22.95-51,51 s22.95,51,51,51s51-22.95,51-51S385.05,153,357,153z M204,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51 S232.05,153,204,153z"/>
  </svg>
);

export default Dots;
