import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getLocalStorage } from '../helpers/functions';
import { LOCAL_STORAGE_SETTINGS } from '../helpers/constants';

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
  initialState: getLocalStorage(LOCAL_STORAGE_SETTINGS, {
    soundOn: false,
    useKilos: true,
  }),
  reducers,
});

export const useKilosToggle = () => {
  const dispatch = useDispatch();
  return (useKilos: boolean) => dispatch({
    type: settingsSlice.actions.useKilos.type,
    payload: useKilos,
  });
};

export const useSoundToggle = () => {
  const dispatch = useDispatch();
  return (soundOn: boolean) => dispatch({
    type: settingsSlice.actions.useSound.type,
    payload: soundOn,
  });
};

export default settingsSlice.reducer;
