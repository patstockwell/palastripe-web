import { SET_SELECTED_EXERCISE } from '../helpers/constants';
import { SelectedExercise, ReduxAction } from '../helpers/types';

const selectedExerciseReducer = (
  state: SelectedExercise,
  action: ReduxAction<SelectedExercise>
): SelectedExercise => {
    switch (action.type) {
      case SET_SELECTED_EXERCISE: {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  };

export default selectedExerciseReducer;
