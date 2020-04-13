import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Settings {
  useKilos: boolean;
  soundOn: boolean;
}

const reducers = {
  useSound: (state: Settings, action: PayloadAction<boolean>) => {
    state.soundOn = action.payload;
  },
  useKilos: (state: Settings, action: PayloadAction<boolean>) => {
    state.useKilos = action.payload;
  },
};

const settingsSlice = createSlice<Settings, typeof reducers>({
  name: 'settings',
  initialState: {
    soundOn: false,
    useKilos: true,
  },
  reducers,
});

export const { useSound, useKilos } = settingsSlice.actions;

export default settingsSlice.reducer;
