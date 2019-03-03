import {
  UPDATE_COMPLETED_REPS,
  END_WORKOUT,
  CHANGE_WEIGHT,
  LOCAL_STORAGE_ACTIVE_WORKOUT,
  REMOVE_EXERCISE,
} from '../helpers/constants';

// Note: The reducer is not the default export from this module.
// It is wrapped with a higher order function that sets localStorage.

const activeWorkoutReducer = (state, action, entities, planId) => {
  if (!state) {
    // if the state is undefined, then the app has just started and
    // we need to generate an activeWorkout
    return createNewActiveWorkout(state, entities, planId);
  }
  switch (action.type) {
    case REMOVE_EXERCISE: {
      return removeExercise(state, action);
    }
    case UPDATE_COMPLETED_REPS: {
      return updateCompletedReps(state, action);
    }
    case END_WORKOUT: {
      return createNewActiveWorkout(state, entities, planId);
    }
    case CHANGE_WEIGHT: {
      return changeWeight(state, action);
    }
    default: {
      return state;
    }
  }
};

const setLocalStorage = state =>
  localStorage.setItem(LOCAL_STORAGE_ACTIVE_WORKOUT, JSON.stringify(state));

const activeWorkoutReducerWithLocalStorage = (...args) => {
  const state = activeWorkoutReducer(...args);
  setLocalStorage(state);
  return state;
};

const removeExercise = (state, action) => {
  const { exerciseId: id } = action.payload;

  return {
    ...state,
    exercises: {
      ...state.exercises,
      [id]: undefined,
    },
    order: state.order.reduce((acc, curr) => (
      curr === id ? acc : acc.concat(curr)
    ), []),
  };
};

const createNewActiveWorkout = (state, entities, planId) => {
  const {
    workoutId,
  } = state || {};

  const {
    workoutPlans: { byId: plansById },
    workouts: { byId: workoutsById },
    exercises: { byId: exercisesById },
  } = entities;

  // get the next workout
  const workoutIds = plansById[planId].workouts;
  const currentIndex = workoutIds.indexOf(workoutId);
  const nextWorkoutId = workoutIds[(currentIndex + 1) % workoutIds.length];
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
    name: nextWorkout.name,
    onGoing: false,
    exercises,
    order: nextWorkout.exercises,
  };
};

const updateCompletedReps = (state, action) => {
  const { payload: { exerciseId, setIndex, reps } } = action;
  const newState = changeExercise(state, exerciseId, {
    sets: state.exercises[exerciseId].sets.map((set, i) => (
      i === setIndex ? { ...set, completed: reps } : set
    )),
  });

  return {
    ...newState,
    onGoing: true,
    startTime: state.startTime || new Date(),
  };
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

export default activeWorkoutReducerWithLocalStorage;

