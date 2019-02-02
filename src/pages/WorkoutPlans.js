import React from 'react';
import Workout from '../components/Workout';
import { monday } from '../helpers/data';

const WorkoutPlans = () => (
  <div>
    <h2>Workout list</h2>
    <Workout workoutRoutine={monday} />
  </div>
)

export default WorkoutPlans;

