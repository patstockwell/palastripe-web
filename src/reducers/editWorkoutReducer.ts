import {
  ReduxAction, // eslint-disable-line no-unused-vars
  WorkoutActivityGroup, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { ADD_SET_TO_NEW_WORKOUT } from '../helpers/constants';

const editWorkoutReducer = (state: Workout, action: ReduxAction<string>) => {
  switch (action.type) {
    case ADD_SET_TO_NEW_WORKOUT: {
      return addSetToEditWorkout(state);
    }
    default: {
      return state;
    }
  }
};

const addSetToEditWorkout = (state: Workout) => {
  // console.log('Exercise button was clicked: ', state);

  const { exerciseGroups } = state;
  const lastGroupIndex = exerciseGroups.length - 1;
  const { exercises } = exerciseGroups[lastGroupIndex];
  const lastExercise = exercises[exercises.length - 1];

  return {
    ...state,
    exerciseGroups: exerciseGroups.map((g: WorkoutActivityGroup, i: number) => (
      lastGroupIndex === i ? {
        ...g,
        exercises: [
          ...g.exercises,
          lastExercise,
        ],
      } : g
    )),
  };
};

export default editWorkoutReducer;
