import {
  CHANGE_REPS,
  SET_ACTIVE_WORKOUT,
  WORKOUT_SHAPE_VERSION,
  TOGGLE_SET_COMPLETE,
} from '../helpers/constants';
import {
  Activity, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
  WeightedActivity, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const activeWorkoutReducer = (state: Workout, action: ReduxAction) => {
  switch (action.type) {
    case CHANGE_REPS: {
      return changeReps(state, action);
    }
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

const changeReps = (state: Workout, action: ReduxAction): Workout => {
  const { payload: { increment, group, index } } = action;
  const { exercises } = state;

  return {
    ...state,
    exercises: {
      ...exercises,
      [group]: exercises[group].map((wa: WeightedActivity, i) => {
        if (i === index) {
          const { repsGoal: g, repsAchieved: a } = wa;
          const newRepsAchieved = a !== undefined ? a + increment : g + increment;

          return {
            ...wa,
            // check first for negative reps and set to zero
            repsAchieved: newRepsAchieved < 0 ? 0 : newRepsAchieved,
          };
        }
        return wa;
      }),
    },
  };
};

const toggleSetComplete = (state: Workout, action: ReduxAction): Workout => {
  const { payload: { completed: done, group, index } } = action;
  const { exercises } = state;

  return {
    ...state,
    exercises: {
      ...exercises,
      [group]: exercises[group].map((s: Activity, i) => (i === index ? {
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
