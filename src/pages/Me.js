import React from 'react';
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';
import BackSplash from '../components/BackSplash';

const Me = ({ location }) => (
  <BackSplash>
    <Banner heading={'Me'}/>
    <Navigation pathname={location.pathname}/>
  </BackSplash>
);

export default Me;

