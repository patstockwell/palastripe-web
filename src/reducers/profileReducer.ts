import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  firstName: string;
  lastName: string;
  firstVisitDate: number;
}

const reducers = {
  updateName: (state: Profile, action: PayloadAction<{
    firstName: string;
    lastName: string;
  }>) => {
    state.firstName = action.payload.firstName;
    state.lastName = action.payload.lastName;
  },
  setFirstVisitDate: (state: Profile, action: PayloadAction<{
    firstVisitDate: number;
  }>) => {
    state.firstVisitDate = action.payload.firstVisitDate;
  },
};

const profileSlice = createSlice<Profile, typeof reducers>({
  name: 'profile',
  initialState: {
    firstName: '',
    lastName: '',
    firstVisitDate: Date.now(),
  },
  reducers,
});

export const { setFirstVisitDate, updateName } = profileSlice.actions;

export default profileSlice.reducer;
