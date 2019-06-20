import initialState from './initialState';
import settingsReducer from './settingsReducer';
import scrollYReducer from './scrollYReducer';
import activeWorkoutReducer from './activeWorkoutReducer';
import historyReducer from './historyReducer';
import createWorkoutReducer from './createWorkoutReducer';

const rootReducer = (state = initialState, action) => ({
  ...state,
  activeWorkout: activeWorkoutReducer(state.activeWorkout, action),
  scrollY: scrollYReducer(state.scrollY, action),
  settings: settingsReducer(state.settings, action),
  history: historyReducer(state.history, action),
  newWorkout: createWorkoutReducer(state.newWorkout, action),
});

export default rootReducer;

