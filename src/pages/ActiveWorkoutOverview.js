import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animated } from 'react-spring';

const BackArrow = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 30px;
`

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
    <BackArrow to="/home">&#9667;</BackArrow>
    <p>some content</p>
  </animated.div>
)

export default ActiveWorkoutOverview;

