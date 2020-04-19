import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workout } from '../helpers/types';
import { LOCAL_STORAGE_HISTORY } from '../helpers/constants';
import { getLocalStorage } from '../helpers/functions';

const reducers = {
  addWorkoutToHistory: (state: Workout[], action: PayloadAction<Workout>) => {
    return [ { ...action.payload, finishTime: Date.now() }, ...state ];
  },
  deleteWorkout: (state: Workout[], action: PayloadAction<number>) => {
    state.slice(action.payload, 1);
  },
};

const historySlice = createSlice<Workout[], typeof reducers>({
  reducers,
  name: 'history',
  // Removing this line will destroy users' history. Never remove.
  initialState: getLocalStorage(LOCAL_STORAGE_HISTORY, []),
});

export const { deleteWorkout, addWorkoutToHistory } = historySlice.actions;

export default historySlice.reducer;
