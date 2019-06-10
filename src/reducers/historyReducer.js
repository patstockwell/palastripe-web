import { FINISH_WORKOUT } from '../helpers/constants';

const historyReducer = (state, action) => {
  switch (action.type) {
    case FINISH_WORKOUT: {
      return finishWorkout(state, action);
    }
    default: {
      return state;
    }
  }
};

const finishWorkout = (state, action) => {
  return [
    {
      ...action.payload,
      finishTime: Date.now(),
    },
    ...state,
  ];
};

export default historyReducer;

