import {
  Settings, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';

// actions
export const CHANGE_UNIT_OF_MEASUREMENT: string = 'CHANGE_UNIT_OF_MEASUREMENT';
export const TOGGLE_SOUND: string = 'TOGGLE_SOUND';

// action creators
export type ToggleSound = (soundOn: boolean) => ReduxAction<boolean>;
export const toggleSound: ToggleSound = soundOn => ({
  type: TOGGLE_SOUND,
  payload: soundOn,
});

export type UseKilosAsUnitOfMeasurement =
  (useKilos: boolean) => ReduxAction<boolean>;
export const useKilosAsUnitOfMeasurement: UseKilosAsUnitOfMeasurement =
  useKilos => ({
    type: CHANGE_UNIT_OF_MEASUREMENT,
    payload: useKilos,
  });

// reducer
const settingsReducer = (
  state: Settings,
  action: ReduxAction<any>
): Settings => {
  switch (action.type) {
    case CHANGE_UNIT_OF_MEASUREMENT: {
      return {
        ...state,
        useKilos: action.payload,
      };
    }
    case TOGGLE_SOUND: {
      return {
        ...state,
        soundOn: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default settingsReducer;
