import { initialState } from './initialState';
import { endWorkout, decrementReps } from './reducers';
import { END_WORKOUT, DECREMENT_REPS } from '../reducers/actions';

export default (state = initialState, action) => {
  switch (action.type) {
  case DECREMENT_REPS:
    return decrementReps(state, action);
  case END_WORKOUT:
    return endWorkout(state);
  default:
    return state;
  }
};


