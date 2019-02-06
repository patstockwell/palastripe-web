import { initialState } from './initialState';
import { decrementReps } from './reducers';

export default (state = initialState, action) => {
  switch (action.type) {
  case 'DECREMENT_REPS':
    return decrementReps(state, action);
  default:
    return state;
  }
};


