import { ReduxAction, State } from '../helpers/types';
import settingsReducer from './settingsReducer';
import profileReducer from './profileReducer';
import activeWorkoutReducer from './activeWorkoutReducer';
import historyReducer from './historyReducer';
import workoutsReducer from './workoutsReducer';
import { getLocalStorage } from '../helpers/functions';
import { LOCAL_STORAGE_ACTIVE_WORKOUT } from '../helpers/constants';

const initialState = {
  activeWorkout: getLocalStorage(LOCAL_STORAGE_ACTIVE_WORKOUT, undefined),
} as State;

const rootReducer = (state: State = initialState, action: ReduxAction<any>): State => ({
  ...state,
  activeWorkout: activeWorkoutReducer(
    state.activeWorkout,
    action,
    // TODO: Remove the dependency on useKilos as an argument to the reducer.
    state.settings && state.settings.useKilos || true,
  ),
  settings: settingsReducer(state.settings, action),
  profile: profileReducer(state.profile, action),
  history: historyReducer(state.history, action),
  workouts: workoutsReducer(state.workouts, action),
});

export default rootReducer;
