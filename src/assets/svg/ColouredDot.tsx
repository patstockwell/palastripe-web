import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  height: 8px;
  display: inline;
  width: 8px;
  margin-right: 8px;
`;

interface Props {
  fill?: string;
}

const ColouredDot: React.FC<Props> = ({ fill = 'black' }) => (
  <Svg width='8' height='8' fill={fill}>
    <circle cx="4" cy="4" r="4" />
  </Svg>
);

export default ColouredDot;
