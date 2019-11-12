import {
  ReduxAction, // eslint-disable-line
  State, // eslint-disable-line
} from '../helpers/types';
import initialState from './initialState';
import settingsReducer from './settingsReducer';
import profileReducer from './profileReducer';
import scrollYReducer from './scrollYReducer';
import activeWorkoutReducer from './activeWorkoutReducer';
import historyReducer from './historyReducer';
import workoutsReducer from './workoutsReducer';
import selectedExerciseReducer from './selectedExerciseReducer';
import navAnimationReducer from './navAnimationReducer';

const rootReducer = (state: State = initialState, action: ReduxAction<any>): State => ({
  ...state,
  activeWorkout: activeWorkoutReducer(state.activeWorkout, action, state.settings.useKilos),
  activeWorkoutSelectedExercise: selectedExerciseReducer(
    state.activeWorkoutSelectedExercise,
    action,
    state.activeWorkout
  ),
  scrollY: scrollYReducer(state.scrollY, action),
  settings: settingsReducer(state.settings, action),
  profile: profileReducer(state.profile, action),
  history: historyReducer(state.history, action),
  entities: {
    ...state.entities,
    workouts: workoutsReducer(state.entities.workouts, action),
  },
  navAnimation: navAnimationReducer(state.navAnimation, action),
});

export default rootReducer;
