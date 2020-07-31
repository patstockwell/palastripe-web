import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Workout } from '../reducers/workoutsReducer';
import { LOCAL_STORAGE_HISTORY } from '../helpers/constants';
import { getLocalStorage } from '../helpers/functions';

const reducers = {
  addWorkoutToHistory: (
    state: Workout[],
    action: PayloadAction<Workout>
  ) => {
    return [
      {
        ...action.payload,
        finishTime: Date.now(),
      },
      ...state,
    ];
  },
  deleteWorkout: (
    state: Workout[],
    action: PayloadAction<number>
  ) => {
    state.splice(action.payload, 1);
  },
  UNSTABLE_AddHistoryToEndOfHistory: (
    state: Workout[],
    action: PayloadAction<Workout[]>
  ) => {
    return state.concat(action.payload);
  },
};

const historySlice = createSlice<Workout[], typeof reducers>({
  reducers,
  name: 'history',
  // Removing this line will destroy users' history. Never remove.
  initialState: getLocalStorage(LOCAL_STORAGE_HISTORY, []),
});

export const useAddWorkoutToHistory = () => {
  const dispatch = useDispatch();
  return (workout: Workout) => dispatch({
    type: historySlice.actions.addWorkoutToHistory.type,
    payload: workout,
  });
};

export const use_UNSTABLE_AddHistoryToEndOfHistory = () => {
  const dispatch = useDispatch();
  return (workouts: Workout[]) => dispatch({
    type: historySlice.actions.UNSTABLE_AddHistoryToEndOfHistory.type,
    payload: workouts,
  });
};

export const useDeleteWorkout = () => {
  const dispatch = useDispatch();
  return (index: number) => dispatch({
    type: historySlice.actions.deleteWorkout.type,
    payload: index,
  });
};

export default historySlice.reducer;
