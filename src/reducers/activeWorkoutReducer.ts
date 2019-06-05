import {
  SET_ACTIVE_WORKOUT,
  WORKOUT_SHAPE_VERSION,
  TOGGLE_SET_COMPLETE,
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
    case TOGGLE_SET_COMPLETE: {
      return toggleSetComplete(state, action);
    }
    default: {
      return state;
    }
  }
};

const toggleSetComplete = (state: Workout, action: ReduxAction): Workout => {
  const {
    payload: {
      completed: done,
      group,
      index,
    },
  } = action;
  const { exercises } = state;

  return {
    ...state,
    exercises: {
      ...exercises,
      [group]: exercises[group].map((s, i) => (i === index ? {
        ...s,
        completed: done ? done : !s.completed,
      } : s)),
    },
  };
};

const setActiveWorkout = (state: Workout, action: ReduxAction): Workout => {
  const { payload } = action;

  return {
    version: WORKOUT_SHAPE_VERSION,
    startTime: Date.now(),
    ...payload,
  };
};

export default activeWorkoutReducer;
