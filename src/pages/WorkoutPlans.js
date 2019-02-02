import React from 'react';
import Workout from '../components/Workout';
import BackSplash from '../components/BackSplash';
import PageHeading from '../components/PageHeading';
import { monday } from '../helpers/data';
import { yellow, green } from '../helpers/constants';

const WorkoutPlans = () => (
  <BackSplash topLeft={green} bottomRight={yellow}>
    <PageHeading>Workout list</PageHeading>
    <Workout workoutRoutine={monday} />
  </BackSplash>
)

export default WorkoutPlans;
