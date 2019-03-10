import { END_WORKOUT } from '../helpers/constants';

const workoutsReducer = (state, action) => {
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
  const { activeWorkout: {
    workoutId,
    order,
    exercises: activeExercises,
  }} = action.payload;

  const updatedExerciseInstances = order.reduce((acc, curr) => {
    // only create an exercise if it exists in the original workout
    if (state.byId[workoutId].exercises[curr]) {
      return {
        ...acc,
        [curr]: {
          ...state.byId[workoutId].exercises[curr],
          // always update the weight regardless of the previous state
          weightInKilos: activeExercises[curr].weightInKilos,
        },
      };
    }
    return acc;
  }, {});

  return {
    ...state,
    byId: {
      ...state.byId,
      [workoutId]: {
        ...state.byId[workoutId],
        exercises: {
          ...state.byId[workoutId].exercises,
          ...updatedExerciseInstances,
        },
      },
    },
  };
};

export default workoutsReducer;

