import {
  Profile, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const profileReducer = (state: Profile, action: ReduxAction<any>) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default profileReducer;
