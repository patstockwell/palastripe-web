import { FINISH_WORKOUT } from '../helpers/constants';
import {
  Activity, // eslint-disable-line no-unused-vars
  ActivityGroup, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
  WeightedActivity, // eslint-disable-line no-unused-vars
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

export const reduceCompletedExercises = (workout: Workout): BoolHash => {
  // find all exercises that were completed
  return workout.exerciseGroups
    .reduce((acc, g: ActivityGroup): Activity[] => (
      [ ...acc, ...g.exercises ]
    ), [])
    .reduce((acc: BoolHash, curr: Activity) => {
      if (isTimed(curr)) {
        return acc;
      }
      const { id, completed, repsGoal, repsAchieved } = curr;
      const newKey = acc[id] === undefined;
      // completed may be undefined so it's cast to boolean with `!!`
      const success = !!completed && repsAchieved >= repsGoal;
      const done = newKey ? success : success && acc[id];

      return {
        ...acc,
        [id]: done,
      };
    }, {});
};

export const adjustWeight = (w: Workout, groupIndex: number) =>
  (a: Activity, i: number): Activity => {
    if (isTimed(a)) {
      return a;
    }

    // find the matching exercise in the completed activeWorkout and use the
    // weightInKilos to update the workout template
    const completedActivity =
      w.exerciseGroups[groupIndex].exercises[i] as WeightedActivity;

    return {
      ...a,
      weightInKilos: completedActivity.weightInKilos,
    };
  };

const updateCompleted = (e: BoolHash) => (a: Activity) => {
  if (isTimed(a)) {
    return a;
  }

  return {
    ...a,
    weightInKilos: e[a.id]
      ? a.weightInKilos + a.autoIncrement
      : a.weightInKilos,
  };
};

const finishWorkout = (allWorkouts: Workouts, workout: Workout): Workouts => {
  const completed: BoolHash = reduceCompletedExercises(workout);
  const { id: wId } = workout;
  const { exerciseGroups } = allWorkouts.byId[wId];
  const newExerciseGroups = exerciseGroups.map((g: ActivityGroup, i) => {
    const newExercises = g.exercises
      .map(adjustWeight(workout, i))
      .map(updateCompleted(completed));

    return { ...g, exercises: newExercises };
  });

  return {
    ...allWorkouts,
    byId: {
      ...allWorkouts.byId,
      [wId]: {
        ...allWorkouts.byId[wId],
        exerciseGroups: newExerciseGroups,
      },
    },
  };
};

export default workoutsReducer;
