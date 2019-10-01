import { CHANGE_UNIT_OF_MEASUREMENT } from '../helpers/constants';
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
        useKilos: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default settingsReducer;
