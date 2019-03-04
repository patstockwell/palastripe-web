import {
  LOCAL_STORAGE_HISTORY,
  END_WORKOUT,
} from '../helpers/constants';

// Note: The reducer is not the default export from this module.
// It is wrapped with a higher order function that sets localStorage.

const historyReducer = (state, action) => {
  switch (action.type) {
    case END_WORKOUT: {
      return endWorkout(state, action);
    }
    default: {
      return state;
    }
  }
};

const historyReducerWithLocalStorage = (...args) => {
  const state = historyReducer(...args);
  setLocalStorage(state);
  return state;
};

const endWorkout = (state, action) => {
  return [
    {
      ...action.payload.activeWorkout,
      finishTime: Date.now(),
    },
    ...state,
  ];
};

const setLocalStorage = history =>
  localStorage.setItem(LOCAL_STORAGE_HISTORY, JSON.stringify(history));

export default historyReducerWithLocalStorage;

