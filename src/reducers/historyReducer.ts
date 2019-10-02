import { FINISH_WORKOUT, DELETE_WORKOUT } from '../helpers/constants';
import {
  Workout, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const historyReducer = (state: Workout[], action: ReduxAction<any>) => {
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

const deleteWorkout = (state: Workout[], action: ReduxAction<number>) => {
  return state.filter((_: any, i) => i !== action.payload);
};

const finishWorkout = (state: Workout[], action: ReduxAction<Workout>) => {
  return [
    {
      ...action.payload,
      finishTime: Date.now(),
    },
    ...state,
  ];
};

export default historyReducer;
