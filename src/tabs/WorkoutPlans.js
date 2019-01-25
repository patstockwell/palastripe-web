import React from 'react';

import Workout from '../components/Workout';

const WorkoutPlans = () => {
  const twoExercisePlan = {
    workoutName: 'Legs Routine',
    exercises: [
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

  return (
    <div>
      <h1>Workout list</h1>
      <Workout workoutRoutine={twoExercisePlan} />
      <Workout workoutRoutine={twoExercisePlan} />
    </div>
  )
}

export default WorkoutPlans;

