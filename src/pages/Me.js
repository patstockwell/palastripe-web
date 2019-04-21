import React from 'react';
import { animated } from 'react-spring';
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';

const Me = ({ animationStyles, location }) => (
  <animated.div style={{ position: 'relative', ...animationStyles }}>
    <Banner heading={'Me'}/>
    <Navigation pathname={location.pathname}/>
  </animated.div>
);

export default Me;

