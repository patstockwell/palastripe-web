import React from 'react';
import styled, { keyframes } from 'styled-components';
import { green } from '../../helpers/constants';

const stroke = keyframes `
  100% {
    stroke-dashoffset: 0;
  }
`;

const scale = keyframes `
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`;

const fill = keyframes `
  100% {
    box-shadow: inset 0px 0px 0px 30px ${green};
  }
`;

const Circle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 9;
  stroke-miterlimit: 10;
  stroke: ${green};
  fill: none;
  animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

const Svg = styled.svg`
  width: 100%;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px ${green};
  animation:
    ${fill} .1s ease-in-out .3s forwards,
    ${scale} .2s ease-in-out .4s both;
`;

const Path = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke-width: 4;
  animation: ${stroke} 0.2s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
`;

const CircleTick = () => (
  <Svg className="checkmark" viewBox="0 0 52 52">
    <Circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
    <Path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
  </Svg>
);

export default CircleTick;