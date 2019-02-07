import { initialState } from './initialState';
import { decrementReps } from './reducers';
import { DECREMENT_REPS } from '../reducers/actions';

export default (state = initialState, action) => {
  switch (action.type) {
  case DECREMENT_REPS:
    return decrementReps(state, action);
  default:
    return state;
  }
};


