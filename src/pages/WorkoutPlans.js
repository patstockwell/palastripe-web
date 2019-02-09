import React from 'react';
import BackSplash from '../components/BackSplash';
import PageHeading from '../components/PageHeading';
import Navigation from '../components/Navigation';
import { purple, blue } from '../helpers/constants';

const WorkoutPlans = () => (
  <BackSplash topLeft={purple} bottomRight={blue}>
    <PageHeading>Workout list</PageHeading>
    <Navigation />
  </BackSplash>
);

export default WorkoutPlans;

