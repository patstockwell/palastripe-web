import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {Workout} from '../reducers/workoutsReducer';
import {LOCAL_STORAGE_HISTORY} from '../helpers/constants';
import {getLocalStorage} from '../helpers/functions';

const reducers = {
  addWorkoutToHistory: (
    state: Workout[],
    action: PayloadAction<Workout>
  ): Workout[] => ([
    {
      ...action.payload,
      // check to see if the startTime was set. The user may have just clicked
      // the finish workout button without starting any exercises.
      startTime: action.payload.startTime || (new Date()).toISOString(),
      finishTime: (new Date()).toISOString(),
    },
    ...state,
  ]),
  deleteWorkout: (
    state: Workout[],
    action: PayloadAction<number>
  ) => {
    state.splice(action.payload, 1);
  },
};

const historySlice = createSlice<Workout[], typeof reducers>({
  reducers,
  name: 'history',
  // Removing this line will destroy users' history. Never remove.
  initialState: getLocalStorage<Workout[]>(LOCAL_STORAGE_HISTORY, []),
});

export const useAddWorkoutToHistory = () => {
  const dispatch = useDispatch();
  return (workout: Workout) => dispatch({
    type: historySlice.actions.addWorkoutToHistory.type,
    payload: workout,
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
