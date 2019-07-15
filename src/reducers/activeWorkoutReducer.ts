import {
  FINISH_WORKOUT,
  CHANGE_REPS,
  SET_ACTIVE_WORKOUT,
  WORKOUT_SHAPE_VERSION,
  TOGGLE_SET_COMPLETE,
  INCREMENT_WEIGHT,
  DECREMENT_WEIGHT,
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
    case INCREMENT_WEIGHT: {
      return changeWeight(state, action);
    }
    case DECREMENT_WEIGHT: {
      return changeWeight(state, action);
    }
    case FINISH_WORKOUT: {
      return finishWorkout();
    }
    case CHANGE_REPS: {
      return changeReps(state, action);
    }
    case SET_ACTIVE_WORKOUT: {
      return setActiveWorkout(action);
    }
    case TOGGLE_SET_COMPLETE: {
      return toggleSetComplete(state, action);
    }
    default: {
      return state;
    }
  }
};

type ChangeSetAction = ReduxAction<SingleSetAction & { value: number }>;

const changeWeight = (state: Workout, action: ReduxAction<SingleSetAction>) => {
  const { payload: { groupId, index } } = action;
  const { exerciseGroups } = state;
  const group = exerciseGroups.find(g => g.id === groupId);
  const weight = (group.exercises[index] as WeightedActivity).weightInKilos;
  // check if the increment should be 0.5 or 2.5
  const increment = weight < 20 ? 0.5 : 2.5;
  // should we increment or decrement?
  const newWeight = action.type === 'DECREMENT_WEIGHT'
    ? weight - increment
    : weight + increment;

  return {
    ...state,
    exerciseGroups: exerciseGroups.map(g => (
      g.id !== groupId ? g : {
        ...g,
        exercises: g.exercises.map((wa: WeightedActivity, i) => (i === index ? {
          ...wa,
          weightInKilos: newWeight < 0 ? 0 : newWeight,
        } : wa)),
      }
    )),
  };
};

const changeReps = (state: Workout, action: ChangeSetAction): Workout => {
  const { payload: { value, groupId, index } } = action;
  const { exerciseGroups } = state;

  return {
    ...state,
    exerciseGroups: exerciseGroups.map(g => (
      g.id !== groupId ? g : {
        ...g,
        exercises: g.exercises.map((wa: WeightedActivity, i) => {
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
      }
    )),
  };
};

// simply set the active workout to undefined when the workout is complete
const finishWorkout = () => undefined;

const toggleSetComplete = (
  state: Workout,
  action: ReduxAction< SingleSetAction & { completed: boolean, }>
): Workout => {
  const { payload: { completed: done, groupId, index } } = action;
  const { startTime, exerciseGroups } = state;

  return {
    ...state,
    startTime: startTime ? startTime : Date.now(),
    exerciseGroups: exerciseGroups.map(g => (
      g.id !== groupId ? g : {
        ...g,
        exercises: g.exercises.map((a: Activity, i) => (i === index ? {
          ...a,
          completed: done ? done : !a.completed,
        } : a)),
      }
    )),
  };
};

const setActiveWorkout = (
  action: ReduxAction<Workout>
): Workout => ({
  version: WORKOUT_SHAPE_VERSION,
  ...action.payload,
});

export default activeWorkoutReducer;
