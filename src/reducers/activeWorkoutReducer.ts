import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  twoAndAHalfPoundsInKilos,
  halfAPoundInKilos,
  LOCAL_STORAGE_ACTIVE_WORKOUT,
} from '../helpers/constants';
import { convertWeight, getLocalStorage } from '../helpers/functions';
import {
  Activity,
  WeightedActivity,
  SingleSetAction,
  State,
} from '../helpers/types';
import { Workout } from '../reducers/workoutsReducer';

const changeWeight = (
  state: Workout,
  action: PayloadAction<SingleSetAction & { useKilos: boolean }>,
  shouldDecrement: boolean,
) => {
  const { payload: { useKilos, groupId, index } } = action;
  const { exerciseGroups } = state;
  const group = exerciseGroups.find(g => g.id === groupId);
  const weight = (group.exercises[index] as WeightedActivity).weightInKilos;

  // calculate increments for pounds or kilos
  const smallIncrement = useKilos ? 0.5 : halfAPoundInKilos;
  const largeIncrement = useKilos ? 2.5 : twoAndAHalfPoundsInKilos;

  // check if the increment should be 0.5 or 2.5
  const useSmallIncrement: boolean = convertWeight(weight, useKilos) < 20
    || convertWeight(weight, useKilos) === 20
    && shouldDecrement;
  const increment: number = useSmallIncrement ? smallIncrement : largeIncrement;

  // should we increment or decrement?
  const newWeight = shouldDecrement ? weight - increment : weight + increment;

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

const changeReps = (
  state: Workout,
  action: PayloadAction<SingleSetAction & { increment: number }>
): Workout => {
  const { payload: { increment, groupId, index } } = action;
  const { exerciseGroups } = state;

  return {
    ...state,
    exerciseGroups: exerciseGroups.map(g => (
      g.id !== groupId ? g : {
        ...g,
        exercises: g.exercises.map((wa: WeightedActivity, i) => {
          if (i === index) {
            const newRepsAchieved: number = increment + wa.repsAchieved;
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

const toggleSetComplete = (
  state: Workout,
  action: PayloadAction<SingleSetAction & { completed?: boolean }>
): Workout => {
  const { payload: { completed: done, groupId, index } } = action;
  const { startTime, exerciseGroups } = state;

  return {
    ...state,
    startTime: startTime ? startTime : (new Date()).toISOString(),
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

const incrementWeight = (
  state: Workout,
  action: PayloadAction<SingleSetAction & { useKilos: boolean }>,
) => {
  return changeWeight(state, action, false);
};

const decrementWeight = (
  state: Workout,
  action: PayloadAction<SingleSetAction & { useKilos: boolean }>,
) => {
  return changeWeight(state, action, true);
};

const setActiveWorkout = (_state: Workout, action: PayloadAction<Workout>) => {
  return action.payload;
};

// simply set the active workout to null when the workout is complete
const finishWorkout = (_state: Workout, _action: Action) => null;

const addActivity = (state: Workout, action: PayloadAction<Activity>) => {
  // We can use the first exerciseGroup because there is only 1 group in a
  // custom workout.
  state.exerciseGroups[0].exercises.push(action.payload);
  if (!state.startTime) {
    state.startTime = (new Date()).toISOString();
  }
};

const deleteActivity = (state: Workout, action: PayloadAction<string>) => {
  const index = state.exerciseGroups[0].exercises.findIndex(a =>
    a.id === action.payload
  );

  if (index !== -1) { // -1 means nothing was found, so only splice if it exists
    state.exerciseGroups[0].exercises.splice(index, 1);
  }
};

const reducers = {
  incrementWeight,
  decrementWeight,
  setActiveWorkout,
  changeReps,
  toggleSetComplete,
  finishWorkout,
  addActivity,
  deleteActivity,
};

const activeWorkoutSlice = createSlice<Workout, typeof reducers>({
  reducers,
  name: 'activeWorkout',
  initialState: getLocalStorage(LOCAL_STORAGE_ACTIVE_WORKOUT, null),
});

const { actions } = activeWorkoutSlice;

export const useActiveWorkout = () => {
  const dispatch = useDispatch();
  const useKilos = useSelector<State, boolean>(state => state.settings.useKilos);

  const deleteActivity =
    (payload: string) => dispatch({
      type: actions.deleteActivity.type,
      payload,
    });

  const toggleSetComplete =
    (payload: SingleSetAction & { completed?: boolean }) => dispatch({
      type: actions.toggleSetComplete.type,
      payload,
    });

  const changeReps = (payload: SingleSetAction & { increment: number }) =>
    dispatch({ type: actions.changeReps.type, payload });

  const setActiveWorkout = (workout: Workout) => dispatch({
    type: actions.setActiveWorkout.type,
    payload: workout,
  });

  const changeWeight = (
    { shouldIncrement, groupId, index }: SingleSetAction & { shouldIncrement: boolean },
  ) => dispatch({
    type: shouldIncrement
      ? actions.incrementWeight.type
      : actions.decrementWeight.type,
    payload: {
      groupId,
      index,
      useKilos,
    },
  });

  const addActivity = (activity: Activity) => dispatch({
    type: actions.addActivity.type,
    payload: activity,
  });

  const finishWorkout = () => dispatch({ type: actions.finishWorkout.type });

  return {
    toggleSetComplete,
    changeReps,
    setActiveWorkout,
    changeWeight,
    addActivity,
    finishWorkout,
    deleteActivity,
  };
};
// TODO: Replace incrementWeight/decrementWeight with single changeWeight func.

export default activeWorkoutSlice.reducer;
