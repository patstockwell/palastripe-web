import {
  CHANGE_REPS,
  CHANGE_WEIGHT,
  SET_ACTIVE_WORKOUT,
  WORKOUT_SHAPE_VERSION,
  TOGGLE_SET_COMPLETE,
} from '../helpers/constants';
import {
  Activity, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
  WeightedActivity, // eslint-disable-line no-unused-vars
  SingleSetAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const activeWorkoutReducer = (state: Workout, action: ReduxAction<any>) => {
  switch (action.type) {
    case CHANGE_WEIGHT: {
      return changeWeight(state, action);
    }
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

const changeWeight = (state: Workout, action: ReduxAction<SingleSetAction & {
  value: number,
}>): Workout => {
  const { payload: { value: w, group, index } } = action;
  const { exercises } = state;

  return {
    ...state,
    exercises: {
      ...exercises,
      [group]: exercises[group].map((wa: WeightedActivity, i) => (i === index ? {
        ...wa,
        weightInKilos: wa.weightInKilos + w < 0 ? 0 : wa.weightInKilos + w,
      } : wa)),
    },
  };
};

const changeReps = (state: Workout, action: ReduxAction<{
  group: string,
  index: number,
  value: number,
}>): Workout => {
  const { payload: { value, group, index } } = action;
  const { exercises } = state;

  return {
    ...state,
    exercises: {
      ...exercises,
      [group]: exercises[group].map((wa: WeightedActivity, i) => {
        if (i === index) {
          const { repsGoal: g, repsAchieved: a } = wa;
          const newRepsAchieved = a !== undefined ? a + value : g + value;

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

const toggleSetComplete = (state: Workout, action: ReduxAction<{
  group: string,
  index: number,
  completed: boolean,
}>): Workout => {
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

const setActiveWorkout = (
  state: Workout,
  action: ReduxAction<Workout>
): Workout => ({
  version: WORKOUT_SHAPE_VERSION,
  startTime: Date.now(),
  ...action.payload,
});

export default activeWorkoutReducer;
