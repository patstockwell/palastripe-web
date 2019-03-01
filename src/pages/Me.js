import React from 'react';
import PropTypes from 'prop-types';
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

Me.propTypes = {
  location: PropTypes.object,
};

export default Me;
