import { FINISH_WORKOUT } from '../helpers/constants';
import {
  Activity, // eslint-disable-line no-unused-vars
  ActivityGroup, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
  Workouts, // eslint-disable-line no-unused-vars
  isTimed,
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

// create a hash of all exercises and their completion
interface BoolHash {
  [exerciseName: string]: boolean;
}

const reduceCompletedExercises = (workout: Workout): BoolHash => {
  // find all exercises that were completed
  return workout.exerciseGroups
    .flatMap((g: ActivityGroup): Activity[] => g.exercises)
    .reduce((acc: BoolHash, curr: Activity) => {
      if (isTimed(curr)) {
        return acc;
      }
      const { id, completed, repsGoal, repsAchieved } = curr;
      const newKey = acc[id] === undefined;
      // completed may be undefined so we cast it to boolean with `!!`
      const success = !!completed && repsAchieved >= repsGoal;
      const done = newKey ? success : success && acc[id];

      return {
        ...acc,
        [id]: done,
      };
    }, {});
};

const finishWorkout = (allWorkouts: Workouts, workout: Workout): Workouts => {
  const completedExercises: BoolHash = reduceCompletedExercises(workout);
  const { id: wId } = workout;
  const { exerciseGroups } = allWorkouts.byId[wId];
  const newExerciseGroups = exerciseGroups.map((g: ActivityGroup) => {
    const newExercises = g.exercises.map((a: Activity) => {
      if (isTimed(a)) {
        return a; // timed exercises don't have weight so can't be incremented
      }

      const newWeight = completedExercises[a.id]
        ? a.weightInKilos + a.autoIncrement
        : a.weightInKilos;

      return { ...a, weightInKilos: newWeight };
    });

    return { ...g, exercises: newExercises };
  });

  return {
    ...allWorkouts,
    byId: {
      ...allWorkouts.byId,
      [wId]: {
        ...workout,
        startTime: undefined, // active workouts will set their own startTime
        finishTime: undefined, // active workouts will set their own finishTime
        exerciseGroups: newExerciseGroups,
      },
    },
  };
};

export default workoutsReducer;
