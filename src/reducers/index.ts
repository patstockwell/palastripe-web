import initialState from './initialState';
import settingsReducer from './settingsReducer';
import scrollYReducer from './scrollYReducer';
import activeWorkoutReducer from './activeWorkoutReducer';

const rootReducer = (state = initialState, action) => ({
  ...state,
  activeWorkout: activeWorkoutReducer(state.activeWorkout, action),
  scrollY: scrollYReducer(state.scrollY, action),
  settings: settingsReducer(state.settings, action),
});

export default rootReducer;

