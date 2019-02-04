import React from 'react';
import Workout from '../components/Workout';
import BackSplash from '../components/BackSplash';
import PageHeading from '../components/PageHeading';
import Navigation from '../components/Navigation';
import { monday } from '../helpers/data';
import { purple, blue } from '../helpers/constants';

const WorkoutPlans = () => (
  <BackSplash topLeft={purple} bottomRight={blue}>
    <PageHeading>Workout list</PageHeading>
    <Workout workoutRoutine={monday} />
    <Navigation />
  </BackSplash>
)

export default WorkoutPlans;

