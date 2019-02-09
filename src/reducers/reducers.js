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

