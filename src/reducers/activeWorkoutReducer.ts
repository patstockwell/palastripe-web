import { v4 as uuidv4 } from 'uuid';
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
  Exercise,
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

const addExercise = (state: Workout, action: PayloadAction<Exercise>) => {
  state.exerciseGroups[0].exercises.push({
    name: action.payload.name,
    id: action.payload.id,
    instanceId: uuidv4(),
    repsAchieved: 10,
    repsGoal: 10,
    weightInKilos: 40,
    autoIncrement: 0,
    completed: true,
  });
};

const reducers = {
  incrementWeight,
  decrementWeight,
  setActiveWorkout,
  changeReps,
  toggleSetComplete,
  finishWorkout,
  addExercise,
};

const activeWorkoutSlice = createSlice<Workout, typeof reducers>({
  reducers,
  name: 'activeWorkout',
  initialState: getLocalStorage(LOCAL_STORAGE_ACTIVE_WORKOUT, null),
});

const { actions } = activeWorkoutSlice;

// TODO: Refactor each of these custom action creator bindings with the
// useActions binding function:
// https://react-redux.js.org/api/hooks#recipe-useactions
export const useToggleSetComplete = () => {
  const dispatch = useDispatch();
  return (payload: SingleSetAction & { completed?: boolean }) => dispatch({
    type: actions.toggleSetComplete.type,
    payload,
  });
};

export const useChangeReps = () => {
  const dispatch = useDispatch();
  return (payload: SingleSetAction & { increment: number }) => dispatch({
    type: actions.changeReps.type,
    payload,
  });
};

export const useSetActiveWorkout = () => {
  const dispatch = useDispatch();
  return (workout: Workout) => dispatch({
    type: actions.setActiveWorkout.type,
    payload: workout,
  });
};

// TODO: Replace incrementWeight/decrementWeight with single changeWeight func.
export const useDecrementWeight = () => {
  const dispatch = useDispatch();
  const useKilos = useSelector<State, boolean>(state => state.settings.useKilos);
  return ({ groupId, index }: SingleSetAction) => dispatch({
    type: actions.decrementWeight.type,
    payload: {
      groupId,
      index,
      useKilos,
    },
  });
};

export const useAddExercise = () => {
  const dispatch = useDispatch();
  return (exercise: Exercise) => dispatch({
    type: actions.addExercise.type,
    payload: { ...exercise },
  });
};

export const useIncrementWeight = () => {
  const dispatch = useDispatch();
  const useKilos = useSelector<State, boolean>(state => state.settings.useKilos);
  return ({ groupId, index }: SingleSetAction) => dispatch({
    type: actions.incrementWeight.type,
    payload: {
      groupId,
      index,
      useKilos,
    },
  });
};

export const useFinishWorkout = () => {
  const dispatch = useDispatch();
  return () => dispatch({ type: actions.finishWorkout.type });
};

export default activeWorkoutSlice.reducer;
