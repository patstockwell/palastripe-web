import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {getLocalStorage} from '../helpers/functions';
import {LOCAL_STORAGE_SETTINGS} from '../helpers/constants';

export interface Settings {
  useKilos: boolean;
  soundOn: boolean;
  useRestTimer: boolean;
}

const reducers = {
  useSound: (state: Settings, action: PayloadAction<boolean>) => {
    state.soundOn = action.payload;
  },
  useKilos: (state: Settings, action: PayloadAction<boolean>) => {
    state.useKilos = action.payload;
  },
  useRestTimer: (state: Settings, action: PayloadAction<boolean>) => {
    state.useRestTimer = action.payload;
  },
};

const settingsSlice = createSlice<Settings, typeof reducers>({
  name: 'settings',
  initialState: getLocalStorage<Settings>(LOCAL_STORAGE_SETTINGS, {
    soundOn: false,
    useKilos: true,
    useRestTimer: true,
  }),
  reducers,
});

export const useSettings = () => {
  const dispatch = useDispatch();
  const setUseKilos = (useKilos: boolean) => dispatch<PayloadAction<boolean>>({
    type: settingsSlice.actions.useKilos.type,
    payload: useKilos,
  });

  const setUseSound = (soundOn: boolean) => dispatch<PayloadAction<boolean>>({
    type: settingsSlice.actions.useSound.type,
    payload: soundOn,
  });

  const setUseRestTimer = (useRestTimer: boolean) => dispatch<PayloadAction<boolean>>({
    type: settingsSlice.actions.useRestTimer.type,
    payload: useRestTimer,
  });

  return {
    setUseKilos,
    setUseSound,
    setUseRestTimer,
  };
};

export default settingsSlice.reducer;
