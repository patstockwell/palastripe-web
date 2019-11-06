import {
  CHANGE_UNIT_OF_MEASUREMENT,
  TOGGLE_SOUND,
} from '../helpers/constants';
import {
  Settings, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';

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
