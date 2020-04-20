import { combineReducers } from 'redux';
import settings from './settingsReducer';
import profile from './profileReducer';
import activeWorkout from './activeWorkoutReducer';
import history from './historyReducer';
import workouts from './workoutsReducer';

export default combineReducers({
  activeWorkout,
  settings,
  profile,
  history,
  workouts,
});
