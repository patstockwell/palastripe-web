import {
  CHANGE_WEIGHT,
  END_WORKOUT,
  REMOVE_EXERCISE,
  START_WORKOUT,
  UPDATE_COMPLETED_REPS,
} from '../helpers/constants';

const activeWorkoutReducer = (state, action, entities) => {
  switch (action.type) {
    case START_WORKOUT: {
      return createNewActiveWorkout(state, action, entities);
    }
    case REMOVE_EXERCISE: {
      return removeExercise(state, action);
    }
    case UPDATE_COMPLETED_REPS: {
      return updateCompletedReps(state, action);
    }
    case END_WORKOUT: {
      return removeActiveWorkout(state);
    }
    case CHANGE_WEIGHT: {
      return changeWeight(state, action);
    }
    default: {
      return state;
    }
  }
};

const removeActiveWorkout = (state) => ({
  ...state,
  activeWorkout: undefined,
});

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

const createNewActiveWorkout = (state, action, entities) => {
  const {
    workouts: { byId: workoutsById },
    exercises: { byId: exercisesById },
  } = entities;

  const workout = workoutsById[action.payload.workoutId];
  const { warmUp, sets, stretch } = workout.exercises;
  const combineExercise = e => ({ ...e, ...exercisesById[e.id] });

  return {
    ...workout,
    exercises: {
      warmUp: warmUp.map(combineExercise),
      sets: sets.map(combineExercise),
      stretch: stretch.map(combineExercise),
    },
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
