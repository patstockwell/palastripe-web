import {
  LOCAL_STORAGE_ENTITIES,
  END_WORKOUT,
} from '../helpers/constants';

// Note: The reducer is not the default export from this module.
// It is wrapped with a higher order function that sets localStorage.

const entitiesReducer = (state, action) => {
  switch (action.type) {
    case END_WORKOUT: {
      return endWorkout(state, action);
    }
    default: {
      return state;
    }
  }
};

const entitiesReducerWithLocalStorage = (...args) => {
  const state = entitiesReducer(...args);
  setLocalStorage(state);
  return state;
};

const endWorkout = (state, action) => {
  const { activeWorkout: { order, exercises } } = action.payload;
  const { exercises: allExercises } = state;

  const updatedExercises = order
    .reduce((acc, currId) => ({
      ...acc,
      [currId]: {
        ...allExercises.byId[currId],
        weightInKilos: exercises[currId].weightInKilos,
      },
    }), {});

  return {
    ...state,
    exercises: {
      ...allExercises,
      byId: {
        ...allExercises.byId,
        ...updatedExercises,
      },
    },
  };
};

const setLocalStorage = state =>
  localStorage.setItem(LOCAL_STORAGE_ENTITIES, JSON.stringify(state));

export default entitiesReducerWithLocalStorage;

