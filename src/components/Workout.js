import React from 'react';

const Workout = ({ workoutRoutine : { workoutName, exercises }}) => {
  const exercisePanels = exercises.map(exercise => {
    const setCounters = exercise.sets.map(reps => (
      <span>{reps}</span>
    ));

    return (
      <div>
        <h3>{exercise.name}</h3>
        <p>Weight: {exercise.weightInKilos}</p>
        {setCounters}
      </div>
    );
  });

  return (
    <div>
      <h2>{workoutName}</h2>
      {exercisePanels}
    </div>
  );
}

export default Workout;

