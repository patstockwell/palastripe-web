import uuidv4 from 'uuid/v4';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  WorkoutActivityGroup, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { ADD_SET_TO_NEW_WORKOUT, ADD_GROUP_TO_NEW_WORKOUT } from '../helpers/constants';

const editWorkoutReducer = (state: Workout, action: ReduxAction<string>) => {
  switch (action.type) {
    case ADD_SET_TO_NEW_WORKOUT: {
      return addSetToEditWorkout(state);
    }
    case ADD_GROUP_TO_NEW_WORKOUT: {
      return addGroupToNewWorkout(state);
    }
    default: {
      return state;
    }
  }
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
