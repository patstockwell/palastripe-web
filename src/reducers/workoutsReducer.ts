import { FINISH_WORKOUT } from '../helpers/constants';
import {
  Activity, // eslint-disable-line no-unused-vars
  ActivityGroup, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
  Workouts, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const workoutsReducer = (
  state: Workouts,
  action: ReduxAction<any>
): Workouts => {
  switch (action.type) {
    case FINISH_WORKOUT: {
      return finishWorkout(state, action.payload);
    }
    default: {
      return state;
    }
  }
};

// find all exercises that were completed and increment the weight
const finishWorkout = (allWorkouts: Workouts, workout: Workout): Workouts => {
  // create a hash of each exercise.
  // exerciseName: boolean (didComplete)
  interface BoolHash {
    [exerciseName: string]: boolean;
  }

  const completedExercises: BoolHash = workout.exerciseGroups
    .flatMap((g: ActivityGroup): Activity[] => g.exercises)
    .reduce((acc: BoolHash, { id, completed }: Activity) => {
      const newKey = acc[id] === undefined;
      const done = newKey ? completed : completed && acc[id];

      return {
        ...acc,
        [id]: done,
      };
    }, {});
  console.log(completedExercises);
  return allWorkouts;
};

export default workoutsReducer;
