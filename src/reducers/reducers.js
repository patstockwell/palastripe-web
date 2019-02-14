export const updateCompletedReps = (state, action) => {
  const { payload: { exerciseId, setIndex, reps } } = action;
  const { activeWorkout } = state;
  const { exercises } = activeWorkout;
  const exercise = exercises[exerciseId];

  return {
    ...state,
    activeWorkout: {
      ...activeWorkout,
      exercises: {
        ...exercises,
        [exerciseId]: {
          ...exercise,
          sets: exercise.sets.map((set, i) => (
            i === setIndex ? { ...set, completed: reps } : set
          )),
        },
      },
    },
  };
};

export const endWorkout = state => {
  const {
    activeWorkout: { workoutId },
    entities: {
      workouts: { byId: workoutsById, allIds },
      exercises: { byId: exercisesById },
    }
  } = state;

  // get the next workout
  const currentIndex = allIds.indexOf(workoutId);
  const nextWorkoutId = allIds[(currentIndex + 1) % allIds.length];
  const nextWorkout = workoutsById[nextWorkoutId];

  // create activeWorkout based on next workout's exercise ids
  const exercises = nextWorkout.exercises
    .map(id => exercisesById[id])
    .reduce((acc, exercise) => ({
      ...acc,
      [exercise.id]: {
        ...exercise,
        sets: exercise.sets.map(reps => ({
          max: reps,
          completed: undefined,
        }))},
    }), {});

  return {
    ...state,
    activeWorkoutOnGoing: false,
    activeWorkout: {
      workoutId: nextWorkoutId,
      exercises,
      order: nextWorkout.exercises,
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
  const { payload: { exerciseId, weight } } = action;
  const { activeWorkout } = state;
  const { exercises } = activeWorkout;
  const exercise = exercises[exerciseId];

  return {
    ...state,
    activeWorkout: {
      ...activeWorkout,
      exercises: {
        ...exercises,
        [exerciseId]: {
          ...exercise,
          weightInKilos: weight,
        },
      },
    },
  };
};
