import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import {Activity, WeightedActivity, isTimed} from '../helpers/types';
import {circuitSpeed} from '../workoutData/workouts/circuitSpeed';
import {fullBodyDumbbellStrength} from '../workoutData/workouts/fullBodyDumbbellStrength';
import {upperBodyBurner} from '../workoutData/workouts/upperBodyBurner';
import {overheadStrength} from '../workoutData/workouts/overheadStrength';
import {fullBodyPower} from '../workoutData/workouts/fullBodyPower';
import {glutesAndGlory} from '../workoutData/workouts/glutesAndGlory';
import {squatAndBench} from '../workoutData/workouts/squatAndBench';
import {shapeAndStrength} from '../workoutData/workouts/shapeAndStrength';
import {pushAndPull} from '../workoutData/workouts/pushAndPull';
import {legPower} from '../workoutData/workouts/legPower';
import {compoundPyramids} from '../workoutData/workouts/compoundPyramids';
import {onTheFlyWorkoutId, onTheFly} from '../workoutData/workouts/onTheFly';
import {getLocalStorage} from '../helpers/functions';
import {LOCAL_STORAGE_WORKOUTS, WORKOUT_VERSION} from '../helpers/constants';

export interface Workouts {
  byId: {
    [propName: string]: Workout,
  };
  allIds: string[];
}

export interface Workout {
  id: string;
  imageUrl?: string;
  startTime?: string;
  finishTime?: string;
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
      const { exerciseId, completed, repsGoal, repsAchieved } = curr;
      const newKey = acc[exerciseId] === undefined;
      const success = !!completed && repsAchieved >= repsGoal;
      const done = newKey ? success : success && acc[exerciseId];

      return {
        ...acc,
        [exerciseId]: done,
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
 * successfully, then the weight is incremented. Each _set_ determines it own
 * increment. That means that if 4 sets of bench press are completed
 * successfully, none, some, or all may get an increment.
 */
const updateCompleted = (e: BoolHash) => (a: Activity) => {
  if (isTimed(a)) {
    return a;
  }

  return {
    ...a,
    weightInKilos: e[a.exerciseId]
      ? a.weightInKilos + a.autoIncrement
      : a.weightInKilos,
  };
};

const byId: { [key: string]: Workout } = {
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
  [onTheFlyWorkoutId]: onTheFly,
};

const allWorkoutTemplates = {
  byId,
  allIds: Object.keys(byId),
};

const mergeWorkouts = (
  initial: Workouts,
  localStorage: Workouts | undefined,
): Workouts => {
  if (localStorage === undefined) {
    return initial;
  }
  const { allIds: localIds, byId: localById } = localStorage;
  const { allIds: initialIds, byId: initialWorkouts } = initial;

  // remove all the workouts from localStorage that don't meet the current version
  const localIdsToKeep = localIds.filter(id => localById[id].version === WORKOUT_VERSION);
  const localIdsToDelete = localIds.filter(id => localById[id].version !== WORKOUT_VERSION);
  localIdsToDelete.forEach(id => {
    delete localById[id];
  });

  // find all the new workouts (any ids not in localStorage)
  const missingIds = initialIds.filter(id => !localIds.includes(id));
  // get each of the workouts for those ids
  const missingWorkouts = missingIds
    .map(id => initialWorkouts[id])
    .reduce ((acc, w) => ({ ...acc, [w.id]: w }), {});

  return {
    byId: {
      ...localById,
      ...missingWorkouts,
    },
    allIds: [ ...localIdsToKeep, ...missingIds ],
  };
};

const localStorageWorkouts: Workouts = getLocalStorage(LOCAL_STORAGE_WORKOUTS, undefined);

const initialState = mergeWorkouts(allWorkoutTemplates, localStorageWorkouts);

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
