import {
  Profile, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { UPDATE_NAME } from '../helpers/constants';

const profileReducer = (state: Profile, action: ReduxAction<any>) => {
  switch (action.type) {
    case UPDATE_NAME: {
      return updateName(action.payload);
    }
    default: {
      return state;
    }
  }
};

const updateName = ({ firstName, lastName }: {
  firstName: string,
  lastName: string,
}): Profile => {
  console.log(firstName, lastName);
  return {
    firstName,
    lastName,
  };
};

export default profileReducer;
