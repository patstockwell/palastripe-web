export const decrementReps = (state, action) => {
  const { payload: { exerciseIndex, setIndex } } = action;
  const { activeWorkout } = state;
  const { exercises } = activeWorkout;
  const { completedSets = [], sets } = exercises[exerciseIndex];

  const reps = completedSets[setIndex]; // the number of completed reps for this set
  const newCompletedSets = [...completedSets]; // make a copy
  const newReps = reps === undefined ? sets[setIndex] :
    reps === 0 ? undefined : reps - 1; // decrement reps or loop back to the start
  newCompletedSets[setIndex] = newReps; // update the completed sets

  return ({
    ...state,
    activeWorkoutOnGoing: true,
    activeWorkout: {
      ...activeWorkout,
      exercises: [
        ...exercises.slice(0, exerciseIndex),
        {
          ...exercises[exerciseIndex],
          completedSets: newCompletedSets,
        },
        ...exercises.slice(exerciseIndex + 1, exercises.length),
      ],
    },
  });
};

export const endWorkout = state => {
  const newWorkoutIndex = (state.workoutCountForThisPlan + 1) % state.workoutPlan.length;
  return {
    ...state,
    activeWorkoutOnGoing: false,
    workoutCountForThisPlan: state.workoutCountForThisPlan + 1,
    activeWorkout: {
      ...state.workoutPlan[newWorkoutIndex],
    },
    history: [
      {
        ...state.activeWorkout,
        date: new Date(),
      },
      ...state.history,
    ],
  };
};

export const changeWeight = (state, action) => {
  const { payload: { exerciseIndex, diff } } = action;
  const { activeWorkout } = state;
  const { exercises } = activeWorkout;
  const updatedWeight = exercises[exerciseIndex].weightInKilos + diff;

  return {
    ...state,
    activeWorkout: {
      ...activeWorkout,
      exercises: [
        ...exercises.slice(0, exerciseIndex),
        {
          ...exercises[exerciseIndex],
          weightInKilos: updatedWeight,
        },
        ...exercises.slice(exerciseIndex + 1, exercises.length),
      ],
    },
  };
};
