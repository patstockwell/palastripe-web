import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  twoAndAHalfPoundsInKilos,
  halfAPoundInKilos,
  LOCAL_STORAGE_ACTIVE_WORKOUT,
} from '../helpers/constants';
import {
  convertKilosToDisplayedWeight,
  convertDisplayedWeightToKilos,
  getLocalStorage,
} from '../helpers/functions';
import {
  Activity,
  WeightedActivity,
  SingleSetAction,
  State,
} from '../helpers/types';
import { Workout } from '../reducers/workoutsReducer';

type SetWeightAction = PayloadAction<SingleSetAction & {
  useKilos: boolean;
  weight: number;
}>;

const setWeight = ( state: Workout, action: SetWeightAction) => {
  const { weight, useKilos, groupId, index } = action.payload;
  const weightInKilos = convertDisplayedWeightToKilos(weight, useKilos);

  state.exerciseGroups.forEach(group => {
    if (group.id === groupId) {
      (group.exercises[index] as WeightedActivity).weightInKilos = weightInKilos;
    }
  });

  return state;
};

const changeWeight = (
  state: Workout,
  action: PayloadAction<SingleSetAction & {
    useKilos: boolean;
    shouldIncrement: boolean;
  }>,
) => {
  const { shouldIncrement, useKilos, groupId, index } = action.payload;
  const { exerciseGroups } = state;
  const group = exerciseGroups.find(g => g.id === groupId);
  const weight = (group.exercises[index] as WeightedActivity).weightInKilos;

  // calculate increments for pounds or kilos
  const smallIncrement = useKilos ? 0.5 : halfAPoundInKilos;
  const largeIncrement = useKilos ? 2.5 : twoAndAHalfPoundsInKilos;

  // check if the increment should be 0.5 or 2.5
  const useLargeIncrement: boolean =
    convertKilosToDisplayedWeight(weight, useKilos) > 20
    || convertKilosToDisplayedWeight(weight, useKilos) === 20 && shouldIncrement;
  const increment: number = useLargeIncrement ? largeIncrement : smallIncrement ;

  // should we increment or decrement?
  const newWeight = shouldIncrement ? weight + increment : weight - increment;

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

type ChangeRepsAction = PayloadAction<SingleSetAction & { newReps: number }>;

const changeReps = (
  state: Workout,
  action: ChangeRepsAction,
): Workout => {
  const { payload: { newReps, groupId, index } } = action;

  state.exerciseGroups.forEach(group => {
    if (group.id === groupId) {
      const newRepsAchieved = newReps < 0 ? 0 : newReps;
      (group.exercises[index] as WeightedActivity).repsAchieved = newRepsAchieved;
    }
  });

  return state;
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

const setActiveWorkout = (_state: Workout, action: PayloadAction<Workout>) => {
  return action.payload;
};

// simply set the active workout to null when the workout is complete
const clearActiveWorkout = (_state: Workout, _action: Action) => null;

const addActivity = (state: Workout, action: PayloadAction<Activity>) => {
  // We can use the first exerciseGroup because there is only 1 group in an
  // onTheFly workout.
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

const setStartTime = (state: Workout, _action: Action): Workout => ({
  ...state,
  // Only set the startTime if the workout hasn't already started.
  startTime: state.startTime || (new Date()).toISOString(),
});

const reducers = {
  setWeight,
  setActiveWorkout,
  changeWeight,
  changeReps,
  toggleSetComplete,
  clearActiveWorkout,
  addActivity,
  deleteActivity,
  setStartTime,
};

const activeWorkoutSlice = createSlice<Workout, typeof reducers>({
  reducers,
  name: 'activeWorkout',
  initialState: getLocalStorage<Workout | null>(LOCAL_STORAGE_ACTIVE_WORKOUT, null),
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

  const changeReps = (payload: SingleSetAction & { newReps: number }) =>
    dispatch<ChangeRepsAction>({ type: actions.changeReps.type, payload });

  const setActiveWorkout = (workout: Workout) => dispatch({
    type: actions.setActiveWorkout.type,
    payload: workout,
  });

  const setWeight = (
    payload: SingleSetAction & { weight: number },
  ) => dispatch<SetWeightAction>({
    type: actions.setWeight.type,
    payload: { ...payload, useKilos },
  });

  const changeWeight = ({
    shouldIncrement,
    groupId,
    index,
  }: SingleSetAction & { shouldIncrement: boolean }) => dispatch({
    type: actions.changeWeight.type,
    payload: { groupId, index, useKilos, shouldIncrement },
  });

  const addActivity = (activity: Activity) => dispatch({
    type: actions.addActivity.type,
    payload: activity,
  });

  const clearActiveWorkout = () => dispatch({ type: actions.clearActiveWorkout.type });

  const setStartTime = () => dispatch({ type: actions.setStartTime.type });

  return {
    setWeight,
    toggleSetComplete,
    changeReps,
    setActiveWorkout,
    changeWeight,
    addActivity,
    clearActiveWorkout,
    deleteActivity,
    setStartTime,
  };
};

export default activeWorkoutSlice.reducer;
