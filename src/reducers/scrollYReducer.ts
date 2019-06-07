import {
  ReduxAction, // eslint-disable-line no-unused-vars
  ScrollY, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { SET_WINDOW_SCROLL } from '../helpers/constants';

const scrollYReducer = (state: ScrollY, action: ReduxAction<{
  scrollY: number,
  page: string,
}>) => {
  switch (action.type) {
    case SET_WINDOW_SCROLL: {
      return setWindowScroll(state, action);
    }
    default: {
      return state;
    }
  }
};

const setWindowScroll = (state: ScrollY, action: ReduxAction<{
  scrollY: number,
  page: string,
}>) => {
  const { payload: { page, scrollY } } = action;

  return {
    ...state,
    [page]: scrollY,
  };
};

export default scrollYReducer;
