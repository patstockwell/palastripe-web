import {
  Profile, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';

export const UPDATE_NAME = 'UPDATE_NAME';
export const SET_FIRST_VISIT_DATE = 'SET_FIRST_VISIT_DATE';

export type SetFirstVisitDate = () => ReduxAction<void>;
export type UpdateName = (names: {
  firstName: string;
  lastName: string;
}) => ReduxAction<{
  firstName: string;
  lastName: string;
}>;

export const setFirstVisitDate: SetFirstVisitDate = () => ({
  type: SET_FIRST_VISIT_DATE,
});

export const updateName: UpdateName = ({ firstName, lastName }) => ({
  type: UPDATE_NAME,
  payload: {
    firstName,
    lastName,
  },
});

const profileReducer = (state: Profile, action: ReduxAction<any>): Profile => {
  switch (action.type) {
    case UPDATE_NAME: {
      return handleUpdateName(state, action.payload);
    }
    case SET_FIRST_VISIT_DATE: {
      return {
        ...state,
        firstVisitDate: Date.now(),
      };
    }
    default: {
      return state;
    }
  }
};

const handleUpdateName = (state: Profile, { firstName, lastName }: {
  firstName: string,
  lastName: string,
}): Profile => ({
  ...state,
  firstName,
  lastName,
});

export default profileReducer;
