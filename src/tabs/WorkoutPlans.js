import React from 'react';
import Navigation from '../components/Navigation'

import Workout from '../components/Workout';

const WorkoutPlans = () => {
  const monday = {
    workoutName: 'Legs Routine',
    data: [
      {
        name: 'deadlift',
        weightInKilos: 80,
        sets: [7, 7, 7, 7],
      },
      {
        name: 'squat',
        weightInKilos: 50,
        sets: [7, 7, 7, 7],
      },
    ],
  };

  const tuesday = {
    workoutName: 'Arms Routine',
    data: [
      {
        name: 'chinups',
        weightInKilos: 0,
        sets: [5, 5, 5, 5],
      },
      {
        name: 'bicep curl',
        weightInKilos: 12,
        sets: [8, 8, 8, 8],
      },
    ],
  };

  return (
    <div>
      <h1>Workout list</h1>
      <Workout workoutRoutine={monday} />
      <Workout workoutRoutine={tuesday} />
      <Navigation />
    </div>
  )
}

export default WorkoutPlans;

