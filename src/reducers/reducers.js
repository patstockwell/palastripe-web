export const decrementReps = (state, action) => {
  const { payload: { exerciseIndex, setIndex } } = action;
  const { activeWorkout } = state;
  const { data } = activeWorkout;
  const { completedSets = [], sets } = data[exerciseIndex];

  const reps = completedSets[setIndex]; // the number of completed reps for this set
  const newCompletedSets = [...completedSets]; // make a copy
  const newReps = reps === undefined ? sets[setIndex] :
    reps === 0 ? undefined : reps - 1; // decrement reps or loop back to the start
  newCompletedSets[setIndex] = newReps; // update the completed sets

  return ({
    ...state,
    activeWorkout: {
      ...activeWorkout,
      data: [
        ...data.slice(0, exerciseIndex),
        {
          ...data[exerciseIndex],
          completedSets: newCompletedSets,
        },
        ...data.slice(exerciseIndex + 1, data.length),
      ],
    },
  });
};

