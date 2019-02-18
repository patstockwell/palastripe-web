import { END_WORKOUT } from '../helpers/constants';

const entitiesReducer = (state, action) => {
  switch (action.type) {
  case END_WORKOUT:
    return endWorkout(state, action);
  default:
    return state;
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

export default entitiesReducer;

