import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { ADD_EXERCISE_TO_NEW_WORKOUT } from '../helpers/constants';

const createWorkoutReducer = (state, action: ReduxAction<string>) => {
  switch (action.type) {
    case ADD_EXERCISE_TO_NEW_WORKOUT: {
      return addExerciseToEditWorkout(state, action);
    }
    default: {
      return state;
    }
  }
};

const addExerciseToEditWorkout = (state, action: ReduxAction<string>) => {
  // console.log('Exercise button was clicked: ', action.payload);
};

export default createWorkoutReducer;
