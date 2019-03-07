import { END_WORKOUT } from '../helpers/constants';

const exercisesReducer = (state, action) => {
  switch (action.type) {
    case END_WORKOUT: {
      return endWorkout(state, action);
    }
    default: {
      return state;
    }
  }
};

const endWorkout = (state, action) => {
  // this function checks and updates the mostWeightInKilos for
  // each exercise in the finished activeWorkout.
  const { activeWorkout: {
    order,
    exercises: activeExercises,
  }} = action.payload;

  const updatedExercises = order.reduce((acc, currId) => {
    const { weightInKilos: recent} = activeExercises[currId]; // activeWorkout
    const { mostWeightInKilos: best} = state.byId[currId]; // entities
    const newBestWeight = recent > best || best === undefined ? recent : best;

    return {
      ...acc,
      [currId]: {
        ...state.byId[currId],
        mostWeightInKilos: newBestWeight,
      },
    };
  }, {});

  return {
    ...state,
    byId: {
      ...state.byId,
      ...updatedExercises,
    },
  };
};

export default exercisesReducer;

