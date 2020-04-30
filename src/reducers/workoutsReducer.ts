import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4} from 'uuid';

import { Activity, WeightedActivity, isTimed } from '../helpers/types';
import { circuitSpeed } from '../workoutData/workouts/circuitSpeed';
import { fullBodyDumbbellStrength } from '../workoutData/workouts/fullBodyDumbbellStrength';
import { upperBodyBurner } from '../workoutData/workouts/upperBodyBurner';
import { overheadStrength } from '../workoutData/workouts/overheadStrength';
import { fullBodyPower } from '../workoutData/workouts/fullBodyPower';
import { glutesAndGlory } from '../workoutData/workouts/glutesAndGlory';
import { squatAndBench } from '../workoutData/workouts/squatAndBench';
import { shapeAndStrength } from '../workoutData/workouts/shapeAndStrength';
import { pushAndPull } from '../workoutData/workouts/pushAndPull';
import { legPower } from '../workoutData/workouts/legPower';
import { compoundPyramids } from '../workoutData/workouts/compoundPyramids';
import { customWorkoutId, customWorkout } from '../workoutData/workouts/customWorkout';
import { getLocalStorage } from '../helpers/functions';
import { LOCAL_STORAGE_WORKOUTS } from '../helpers/constants';

export interface Workouts {
  byId: {
    [propName: string]: Workout,
  };
  allIds: string[];
}

export interface Workout {
  id: string;
  imageUrl?: string;
  startTime?: number;
  finishTime?: number;
  name: string;
  version?: string;
  exerciseGroups: ActivityGroup[];
}

export interface ActivityGroup {
  id: string;
  name: string;
  exercises: Activity[];
}

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

const allWorkoutTemplates = {
  byId: {
    'full-body-dumbbell-strength': fullBodyDumbbellStrength,
    'circuit-speed': circuitSpeed,
    'upper-body-burner': upperBodyBurner,
    'overhead-strength': overheadStrength,
    'full-body-power': fullBodyPower,
    'glutes-and-glory': glutesAndGlory,
    'squat-and-bench': squatAndBench,
    'shape-and-strength': shapeAndStrength,
    'push-and-pull': pushAndPull,
    'leg-power': legPower,
    'compound-pyramids': compoundPyramids,
    [customWorkoutId]: customWorkout,

  },
  allIds: [
    'shape-and-strength',
    'push-and-pull',
    'leg-power',
    'compound-pyramids',
    'full-body-dumbbell-strength',
    'squat-and-bench',
    'circuit-speed',
    'glutes-and-glory',
    'upper-body-burner',
    'overhead-strength',
    'full-body-power',
    customWorkoutId,
  ],
};

const mergeWorkouts = (
  initial: Workouts,
  localStorage: Workouts | undefined,
): Workouts => {
  if (localStorage === undefined) {
    return initial;
  }
  // TODO: remove all the workouts from localStorage that don't meet version1
  const { allIds: localIds, byId } = localStorage;
  const { allIds: initialIds, byId: initialWorkouts } = initial;
  // find all the ids not in localStorage
  const missingIds = initialIds.filter(id => !localIds.includes(id));
  // get each of the workouts for those ids
  const missingWorkouts = missingIds
    .map(id => initialWorkouts[id])
    .reduce ((acc, w) => ({ ...acc, [w.id]: w }), {});

  return {
    byId: { ...byId, ...missingWorkouts },
    allIds: [ ...localIds, ...missingIds ],
  };
};

const localStorageWorkouts: Workouts = getLocalStorage(LOCAL_STORAGE_WORKOUTS, undefined);
// instanceId was added to the `Activity` types meaning that some clients have
// workouts stored in localStorage that out of date. Here we ensure that
// workouts retreived from localStorage are given a instanceIds on all
// Activities if missing.
// TODO: Remove this after 30th October 2020 (6 months from implementation).
// This allows for enough time for existing users who might care about their
// data to open the app at least once and have their workout templates updated.
const getWorkoutsWithUpdatedInstanceIds = (allIds: string[]) => allIds.reduce(
  (acc, id): { [key: string]: Workout } => {
    const workout: Workout = localStorageWorkouts.byId[id];
    const newActivityGroups = workout.exerciseGroups.map(
      (group): ActivityGroup => {
        return {
          ...group,
          exercises: group.exercises.map(exercise => ({
            ...exercise,
            instanceId: exercise.instanceId || uuidv4(),
          })),
        };
      });

    return {
      ...acc,
      [workout.id]: { ...workout, exerciseGroups: newActivityGroups },
    };
  }, {});

const updatedLocalStorageWorkouts: Workouts | undefined = localStorageWorkouts
  ? {
    allIds: localStorageWorkouts.allIds,
    byId: getWorkoutsWithUpdatedInstanceIds(localStorageWorkouts.allIds)
  } : undefined;

const initialState = mergeWorkouts(allWorkoutTemplates, updatedLocalStorageWorkouts);
// const initialState = mergeWorkouts(allWorkoutTemplates, localStorageWorkouts);

const reducers = {
  // When an active workout is finished, we update the existing workout template
  // that it came from. First update the weight values to match those executed in
  // the active workout, secondly, auto increment any exercises where all
  // sets and reps were completed successfully.
  updateWorkout: (state: Workouts, action: PayloadAction<Workout>) => {
    const workout = action.payload;
    const { id: wId } = workout;
    const completed: BoolHash = reduceCompletedExercises(workout);
    const { exerciseGroups } = state.byId[wId];
    const newExerciseGroups = exerciseGroups.map((g: ActivityGroup, i) => {
      const newExercises = g.exercises
        .map(adjustWeight(workout, i))
        .map(updateCompleted(completed));
      return { ...g, exercises: newExercises };
    });
    state.byId[wId].exerciseGroups = newExerciseGroups;
  },
};

const workoutsSlice = createSlice<Workouts, typeof reducers>({
  reducers,
  name: 'workouts',
  initialState,
});

export const useUpdateWorkout = () => {
  const dispatch = useDispatch();
  return (workout: Workout) => dispatch({
    type: workoutsSlice.actions.updateWorkout.type,
    payload: workout,
  });
};

export default workoutsSlice.reducer;
