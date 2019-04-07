import initialState from './initialState';
import settingsReducer from './settingsReducer';
import scrollYReducer from './scrollYReducer';

const rootReducer = (state = initialState, action) => ({
  ...state,
  scrollY: scrollYReducer(state.scrollY, action),
  settings: settingsReducer(state.settings, action),
});

export default rootReducer;

