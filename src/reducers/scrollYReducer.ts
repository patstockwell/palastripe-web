import {
  ReduxAction,
  ScrollY,
} from '../helpers/types';

export const SET_WINDOW_SCROLL: string = 'SET_WINDOW_SCROLL';

export const setWindowScroll: SetWindowScroll = (scrollY, page) => ({
  type: SET_WINDOW_SCROLL,
  payload: {
    scrollY,
    page,
  },
});

export type SetWindowScroll = (scrollY: number, page: string) => ReduxAction<{
  scrollY: number,
  page: string,
}>;

const scrollYReducer = (state: ScrollY, action: ReduxAction<{
  scrollY: number,
  page: string,
}>) => {
  switch (action.type) {
    case SET_WINDOW_SCROLL: {
      return handleSetWindowScroll(state, action);
    }
    default: {
      return state;
    }
  }
};

const handleSetWindowScroll = (state: ScrollY, action: ReduxAction<{
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
