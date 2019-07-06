import { FINISH_WORKOUT, DELETE_WORKOUT } from '../helpers/constants';

const historyReducer = (state, action) => {
  switch (action.type) {
    case FINISH_WORKOUT: {
      return finishWorkout(state, action);
    }
    case DELETE_WORKOUT: {
      return deleteWorkout(state, action);
    }
    default: {
      return state;
    }
  }
};

const deleteWorkout = (state, action) => {
  return state.filter((w, i) => i !== action.payload);
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

