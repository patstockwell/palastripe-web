import { SET_FIRST_RENDER_FLAG } from '../helpers/constants';

const firstRenderReducer = (state: boolean, action: { type: string }) => {
  switch (action.type) {
    case SET_FIRST_RENDER_FLAG: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default firstRenderReducer;
