import initialState from './initialState';
import settingsReducer from './settingsReducer';
import activeWorkoutReducer from './activeWorkoutReducer';
import historyReducer from './historyReducer';
import entitiesReducer from './entitiesReducer';
import scrollYReducer from './scrollYReducer';

const rootReducer = (state = initialState, action) => ({
  scrollY: scrollYReducer(state.scrollY, action),
  settings: settingsReducer(state.settings, action),
  activeWorkout: activeWorkoutReducer(
    state.activeWorkout,
    action,
    state.entities,
    state.settings.planId
  ),
  entities: entitiesReducer(state.entities, action),
  history: historyReducer(state.history, action),
});

export default rootReducer;

