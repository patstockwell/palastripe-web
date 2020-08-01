import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getLocalStorage } from '../helpers/functions';
import { LOCAL_STORAGE_PROFILE } from '../helpers/constants';

export interface Profile {
  firstName: string;
  lastName: string;
  firstVisitDate: string;
}

const reducers = {
  updateName: (state: Profile, action: PayloadAction<{
    firstName: string;
    lastName: string;
  }>) => {
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
  },
};

const profileSlice = createSlice<Profile, typeof reducers>({
  name: 'profile',
  initialState: getLocalStorage(LOCAL_STORAGE_PROFILE, {
    firstName: '',
    lastName: '',
    // If nothing is found in localStorage, then this is the user's first visit.
    // Set the firstVisitDate to now.
    firstVisitDate: (new Date()).toISOString(),
  } as Profile),
  reducers,
});

export const useUpdateName = () => {
  const dispatch = useDispatch();
  return (names: { firstName: string, lastName: string }) => dispatch({
    type: profileSlice.actions.updateName.type,
    payload: names,
  });
};

export default profileSlice.reducer;
