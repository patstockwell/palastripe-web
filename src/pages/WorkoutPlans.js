import React from 'react';
import PropTypes from 'prop-types';
import BackSplash from '../components/BackSplash';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import { purple, blue } from '../helpers/constants';

const WorkoutPlans = ({ location }) => (
  <BackSplash topLeft={purple} bottomRight={blue}>
    <Banner />
    <Navigation pathname={location.pathname}/>
  </BackSplash>
);

WorkoutPlans.propTypes = {
  location: PropTypes.object,
};

export default WorkoutPlans;

