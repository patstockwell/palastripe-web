import { END_WORKOUT } from '../helpers/constants';

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

const endWorkout = (state, action) => {
  const { workouts, exercises: allExercises } = state;
  const { activeWorkout: {
    workoutId,
    order,
    exercises: activeExercises,
  }} = action.payload;

  const updatedExerciseDefinitions = order.reduce((acc, currId) => {
    const { weightInKilos } = activeExercises[currId]; // activeWorkout
    const { mostWeightInKilos } = allExercises.byId[currId]; // entities
    const newBestWeight = weightInKilos > mostWeightInKilos
      ? weightInKilos
      : mostWeightInKilos;

    return {
      ...acc,
      [currId]: {
        ...allExercises.byId[currId],
        weightInKilos: newBestWeight,
      },
    };
  }, {});

  const updatedExerciseInstances = order.reduce((acc, curr) => {
    // only create an exercise if it exists in the original workout
    if (workouts.byId[workoutId].exercises[curr]) {
      return {
        ...acc,
        [curr]: {
          ...workouts.byId[workoutId].exercises[curr],
          weightInKilos: activeExercises[curr].weightInKilos,
        },
      };
    }
    return acc;
  }, {});

  return {
    ...state,
    exercises: {
      ...allExercises,
      byId: {
        ...allExercises.byId,
        ...updatedExerciseDefinitions,
      },
    },
    workouts: {
      ...workouts,
      byId: {
        ...workouts.byId,
        [workoutId]: {
          ...workouts.byId[workoutId],
          exercises: updatedExerciseInstances,
        },
      },
    },
  };
};


export default entitiesReducer;

