import { FINISH_WORKOUT } from '../helpers/constants';
import {
  Activity,
  ActivityGroup,
  ReduxAction,
  Workout,
  WeightedActivity,
  Workouts,
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

/**
 * This function turns a workout into an object hash. Each key is an exercise id
 * and the value is a boolean, which represents if all sets of an exercise were
 * completed successfully
 */
export const reduceCompletedExercises = (workout: Workout): BoolHash => {
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

/**
 * This function ensures that if the user has adjusted a weight during a
 * workout, that it gets remembered for next time. We do this by taking the
 * weight from the completed workout and assigning it to the workout template.
 */
export const adjustWeight = (w: Workout, groupIndex: number) =>
  (a: Activity, i: number): Activity => {
    if (isTimed(a)) {
      return a;
    }

    const completedActivity =
      w.exerciseGroups[groupIndex].exercises[i] as WeightedActivity;

    return {
      ...a,
      weightInKilos: completedActivity.weightInKilos,
    };
  };

/**
 * This function ensures that if all sets for an exercise were completed
 * successfully, then the weight is incremented. Each _set_ detirmines it own
 * increment. That means that if 4 sets of bench press are completed
 * successfully, none, some, or all may get an increment.
 */
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
