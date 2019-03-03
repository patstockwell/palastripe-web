import {
  LOCAL_STORAGE_HISTORY,
  END_WORKOUT,
} from '../helpers/constants';

const historyReducer = (state, action) => {
  switch (action.type) {
    case END_WORKOUT: {
      const newHistory = endWorkout(state, action);
      setLocalStorage(newHistory);
      return newHistory;
    }
    default: {
      return state;
    }
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

const setLocalStorage = history =>
  localStorage.setItem(LOCAL_STORAGE_HISTORY, JSON.stringify(history));

export default historyReducer;

