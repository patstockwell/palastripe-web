import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { SET_IMMEDIATE } from '../helpers/constants';

interface Immediate {
  immediate: boolean;
}

const scrollYReducer = (state: Immediate, action: ReduxAction) => {
  switch (action.type) {
    case SET_IMMEDIATE: {
      return setImmediate(state, action);
    }
    default: {
      return state;
    }
  }
};

const setImmediate = (state: Immediate , action: ReduxAction) => {
  const { payload: { immediate } } = action;

  return { immediate };
};

export default scrollYReducer;
