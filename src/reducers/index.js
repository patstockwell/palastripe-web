import initialState from './initialState';
import settingsReducer from './settingsReducer';
import scrollYReducer from './scrollYReducer';
import transitionReducer from './transitionReducer';

const rootReducer = (state = initialState, action) => ({
  ...state,
  scrollY: scrollYReducer(state.scrollY, action),
  immediateTransition: transitionReducer(state.immediateTransition, action),
  settings: settingsReducer(state.settings, action),
});

export default rootReducer;

