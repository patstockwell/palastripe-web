import React from 'react';
import { connect } from 'react-redux';
import BackSplash from '../components/BackSplash';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import { green, yellow } from '../helpers/constants';

const WorkoutPlans = ({ location }) => (
  <BackSplash topLeft={green} bottomRight={yellow}>
    <Banner />
    <Navigation pathname={location.pathname}/>
  </BackSplash>
);

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(WorkoutPlans);

