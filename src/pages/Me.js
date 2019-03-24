import React from 'react';
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';
import BackSplash from '../components/BackSplash';
import { blue, green } from '../helpers/constants';

const Me = ({ location }) => (
  <BackSplash topLeft={blue} bottomRight={green}>
    <Banner />
    <Navigation pathname={location.pathname}/>
  </BackSplash>
);

export default Me;

