import uuidv4 from 'uuid/v4';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  WorkoutActivityGroup, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  EDIT_WORKOUT_ADD_SET,
  EDIT_WORKOUT_ADD_GROUP,
  EDIT_WORKOUT_UPDATE_GROUP_NAME,
} from '../helpers/constants';

const editWorkoutReducer = (state: Workout, action: ReduxAction<any>) => {
  switch (action.type) {
    case EDIT_WORKOUT_ADD_SET: {
      return addSetToEditWorkout(state);
    }
    case EDIT_WORKOUT_UPDATE_GROUP_NAME: {
      return updateNameForEditWorkout(state, action);
    }
    case EDIT_WORKOUT_ADD_GROUP: {
      return addGroupToNewWorkout(state);
    }
    default: {
      return state;
    }
  }
};

const updateNameForEditWorkout = (
  state: Workout,
  action: ReduxAction<{ id: string, name: string }>
) => {
  const { name, id } = action.payload;

  return {
    ...state,
    exerciseGroups: state.exerciseGroups.map((g: WorkoutActivityGroup) =>
      (g.id === id) ? { ...g, name } : g
    ),
  };
};

const addGroupToNewWorkout = (state: Workout) => {
  const newGroup: WorkoutActivityGroup = {
    id: uuidv4(),
    name: 'Group',
    exercises: [],
  };

  return {
    ...state,
    exerciseGroups: [
      ...state.exerciseGroups,
      newGroup,
    ],
  };
};

const addSetToEditWorkout = (state: Workout) => {
  const { exerciseGroups } = state;
  const lastGroupIndex = exerciseGroups.length - 1;
  const { exercises } = exerciseGroups[lastGroupIndex];
  const lastExercise = exercises[exercises.length - 1] || {
    id: uuidv4(),
    name: 'Exercise with reps',
    repsGoal: 12,
    weightInKilos: 20,
    autoIncrement: 0,
    completed: false,
  };

  return {
    ...state,
    exerciseGroups: exerciseGroups.map((g: WorkoutActivityGroup, i: number) => (
      lastGroupIndex === i ? {
        ...g,
        exercises: [
          ...g.exercises,
          lastExercise,
        ],
      } : g
    )),
  };
};

export default editWorkoutReducer;