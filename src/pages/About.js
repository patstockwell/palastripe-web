import React from 'react';
import Banner from '../components/Banner';
import PageHeading from '../components/PageHeading';
import Navigation from '../components/Navigation';
import BackSplash from '../components/BackSplash';
import { blue, green } from '../helpers/constants';

const About = () => (
  <BackSplash topLeft={blue} bottomRight={green}>
    <Banner />
    <PageHeading>About</PageHeading>
    <Navigation />
  </BackSplash>
);

export default About;

