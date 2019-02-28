import { END_WORKOUT } from '../helpers/constants';

const historyReducer = (state, action) => {
  switch (action.type) {
  case END_WORKOUT:
    return endWorkout(state, action);
  default:
    return state;
  }
};

const endWorkout = (state, action) => {
  return [
    {
      ...action.payload.activeWorkout,
      finishTime: new Date(),
    },
    ...state,
  ];
};

export default historyReducer;

