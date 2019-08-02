import {
  ReduxAction, // eslint-disable-line
  State, // eslint-disable-line
} from '../helpers/types';
import initialState from './initialState';
import settingsReducer from './settingsReducer';
import scrollYReducer from './scrollYReducer';
import activeWorkoutReducer from './activeWorkoutReducer';
import historyReducer from './historyReducer';
import editWorkoutReducer from './editWorkoutReducer';
import firstRenderReducer from './firstRenderReducer';
import selectedExerciseReducer from './selectedExerciseReducer';

const rootReducer = (state = initialState, action: ReduxAction<any>): State => ({
  ...state,
  isFirstRender: firstRenderReducer(state.isFirstRender, action),
  activeWorkout: activeWorkoutReducer(state.activeWorkout, action),
  activeWorkoutSelectedExercise: selectedExerciseReducer(
    state.activeWorkoutSelectedExercise,
    action,
    state.activeWorkout
  ),
  scrollY: scrollYReducer(state.scrollY, action),
  settings: settingsReducer(state.settings, action),
  history: historyReducer(state.history, action),
  editableWorkout: editWorkoutReducer(state.editableWorkout, action),
});

export default rootReducer;
