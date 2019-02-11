import { initialState } from './initialState';
import { changeWeight, endWorkout, decrementReps } from './reducers';
import {
  CHANGE_WEIGHT,
  END_WORKOUT,
  DECREMENT_REPS,
} from '../reducers/actions';

export default (state = initialState, action) => {
  switch (action.type) {
  case DECREMENT_REPS:
    return decrementReps(state, action);
  case END_WORKOUT:
    return endWorkout(state);
  case CHANGE_WEIGHT:
    return changeWeight(state, action);
  default:
    return state;
  }
};


