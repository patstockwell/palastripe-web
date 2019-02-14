import initialState from './initialState';
import { updateCompletedReps, changeWeight, endWorkout } from './reducers';
import {
  CHANGE_WEIGHT,
  END_WORKOUT,
  UPDATE_COMPLETED_REPS,
} from '../reducers/actions';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_COMPLETED_REPS:
    return updateCompletedReps(state, action);
  case END_WORKOUT:
    return endWorkout(state);
  case CHANGE_WEIGHT:
    return changeWeight(state, action);
  default:
    return state;
  }
};

export default rootReducer;

