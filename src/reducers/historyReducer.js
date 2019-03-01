import {
  LOCAL_STORAGE_HISTORY,
  END_WORKOUT,
  SET_LOCAL_STORAGE,
} from '../helpers/constants';

const historyReducer = (state, action) => {
  switch (action.type) {
  case END_WORKOUT:
    return endWorkout(state, action);
  case SET_LOCAL_STORAGE:
    setLocalStorage(state);
    return state;
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

const setLocalStorage = history =>
  localStorage.setItem(LOCAL_STORAGE_HISTORY, JSON.stringify(history));

export default historyReducer;

