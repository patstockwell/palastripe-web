import {
  SET_NAV_ANIMATION,
} from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const navAnimationReducer = (
  state: number,
  action: ReduxAction<number>
): number => {
  switch (action.type) {
    case SET_NAV_ANIMATION: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default navAnimationReducer;
