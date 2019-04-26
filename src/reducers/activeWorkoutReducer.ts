import {
  SET_ACTIVE_WORKOUT,
  WORKOUT_SHAPE_VERSION,
} from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const activeWorkoutReducer = (state: Workout, action: ReduxAction) => {
  switch (action.type) {
    case SET_ACTIVE_WORKOUT: {
      return setActiveWorkout(state, action);
    }
    default: {
      return state;
    }
  }
};

const setActiveWorkout = (state: Workout, action: ReduxAction) => {
  const { payload } = action;

  return {
    version: WORKOUT_SHAPE_VERSION,
    startTime: Date.now(),
    ...payload,
  };
};

export default activeWorkoutReducer;
