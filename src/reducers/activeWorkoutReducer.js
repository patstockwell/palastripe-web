import {
  UPDATE_COMPLETED_REPS,
  END_WORKOUT,
  CHANGE_WEIGHT,
} from '../helpers/constants';

const activeWorkoutReducer = (state, action, entities) => {
  switch (action.type) {
  case UPDATE_COMPLETED_REPS:
    return updateCompletedReps(state, action);
  case END_WORKOUT:
    return endWorkout(state, entities);
  case CHANGE_WEIGHT:
    return changeWeight(state, action);
  default:
    return state;
  }
};

const endWorkout = (state, entities) => {
  const {
    workoutId ,
  } = state;

  const {
    workouts: { byId: workoutsById, allIds },
    exercises: { byId: exercisesById },
  } = entities;

  // get the next workout
  const currentIndex = allIds.indexOf(workoutId);
  const nextWorkoutId = allIds[(currentIndex + 1) % allIds.length];
  const nextWorkout = workoutsById[nextWorkoutId];

  // map exercise data
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
    workoutId: nextWorkoutId,
    onGoing: false,
    exercises,
    order: nextWorkout.exercises,
  };
};

const updateCompletedReps = (state, action) => {
  const { payload: { exerciseId, setIndex, reps } } = action;

  return changeExercise(state, exerciseId, {
    sets: state.exercises[exerciseId].sets.map((set, i) => (
      i === setIndex ? { ...set, completed: reps } : set
    )),
  });
};

const changeWeight = (state, action) => {
  const { payload: { exerciseId, weight } } = action;

  return changeExercise(state, exerciseId, {
    weightInKilos: weight,
  });
};

const changeExercise = (state, exerciseId, newData) => {
  const { exercises } = state;
  const exercise = exercises[exerciseId];

  return {
    ...state,
    exercises: {
      ...exercises,
      [exerciseId]: {
        ...exercise, // start with all the old stuff
        ...newData, // spread any new changes
      },
    },
  };
};

export default activeWorkoutReducer;

