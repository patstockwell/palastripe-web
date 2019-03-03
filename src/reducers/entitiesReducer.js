import {
  LOCAL_STORAGE_ENTITIES,
  END_WORKOUT,
} from '../helpers/constants';

const entitiesReducer = (state, action) => {
  switch (action.type) {
    case END_WORKOUT: {
      const newState = endWorkout(state, action);
      setLocalStorage(newState);
      return newState;
    }
    default: {
      return state;
    }
  }
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

export default entitiesReducer;

