import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animated } from 'react-spring';

const Back = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 15px;
  height: 20px;
  display: flex;
  align-items: center;
`

const Arrow = () => (
  <svg viewBox="0 0 240 240" width='20' height='20'>
    <g>
      <path d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179   l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816   C52.942,116.507,52.942,124.327,57.633,129.007z" fill="#FFFFFF"/>
    </g>
  </svg>
)

const ActiveWorkoutOverview = ({ animationStyles }) => (
  <animated.div style={{
    ...animationStyles,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'green',
    zIndex: 10,
  }}>
    <Back to="/home">
      <Arrow /> Back
    </Back>
    <p>some content</p>
  </animated.div>
)

export default ActiveWorkoutOverview;

