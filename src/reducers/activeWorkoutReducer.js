import {
  UPDATE_COMPLETED_REPS,
  END_WORKOUT,
  CHANGE_WEIGHT,
  REMOVE_EXERCISE,
} from '../helpers/constants';

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
    plans: { byId: plansById },
    workouts: { byId: workoutsById },
    exercises: { byId: exercisesById },
  } = entities;

  // get the next workout
  const workoutIds = plansById[planId].workouts;
  const currentIndex = workoutIds.indexOf(workoutId);
  const nextWorkoutId = workoutIds[(currentIndex + 1) % workoutIds.length];
  const nextWorkout = workoutsById[nextWorkoutId];

  // map exercise data
  const exercises = nextWorkout.order
    .map(id => ({
      // combine global exercise data and specific workout data
      ...exercisesById[id],
      ...nextWorkout.exercises[id],
    }))
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
    order: nextWorkout.order,
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
    startTime: state.startTime || Date.now(),
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

export default activeWorkoutReducer;

