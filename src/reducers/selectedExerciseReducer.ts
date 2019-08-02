import {
  SELECT_NEXT_EXERCISE,
  SET_SELECTED_EXERCISE,
} from '../helpers/constants';
import {
  Workout,
  SelectedExercise,
  ReduxAction,
} from '../helpers/types';

const selectedExerciseReducer = (
  state: SelectedExercise,
  action: ReduxAction<SelectedExercise>,
  activeWorkout: Workout
): SelectedExercise => {
    switch (action.type) {
      case SET_SELECTED_EXERCISE: {
        return action.payload;
      }
      case SELECT_NEXT_EXERCISE: {
        return selectNextExercise(state, activeWorkout);
      }
      default: {
        return state;
      }
    }
  };

const selectNextExercise = (
  { index, groupId }: SelectedExercise,
  { exerciseGroups }: Workout
): SelectedExercise => {
  console.log('yeah', exerciseGroups);
  const groupIndex = exerciseGroups.findIndex(g => g.id === groupId);
  const group = exerciseGroups[groupIndex];

  // if there is still another exercise in this list, then give me the next
  if (index + 1 < group.exercises.length) {
    return { index: index + 1, groupId };
  }

  // else give me the first exercise in the next list (or false if none exists)
  const newGroupId: string =
    exerciseGroups[groupIndex + 1] && exerciseGroups[groupIndex + 1].id;
  return { groupId: newGroupId, index: 0 };
};

export default selectedExerciseReducer;
