import { Action } from '@reduxjs/toolkit';
import { Profile } from '../reducers/profileReducer';
import { Settings } from '../reducers/settingsReducer';
import { Workout } from '../reducers/workoutsReducer';

export interface ReduxAction<P> extends Action {
  payload?: P;
}

export interface SingleSetAction {
  groupId: string;
  index: number;
}

// State shape
export interface State {
  activeWorkout?: Workout;
  profile: Profile;
  settings: Settings;
  workouts: Workouts;
  history: Workout[];
  editableWorkout?: Workout;
  editableActivity?: WeightedActivity & TimedActivity;
}

export interface Workouts {
  byId: {
    [propName: string]: Workout,
  };
  allIds: string[];
}

// Activity stuff

export interface TimedActivity {
  id: string;
  name: string;
  restPeriodInSeconds?: number;
  completed?: boolean;
  timerInSeconds: number;
}

export interface WeightedActivity {
  id: string;
  name: string;
  restPeriodInSeconds?: number;
  completed?: boolean;
  weightInKilos: number;
  repsGoal: number;
  repsAchieved: number;
  autoIncrement: number;
}

export interface Exercise {
  id: string;
  name: string;
  tags: string[];
}

export type Activity = WeightedActivity | TimedActivity;

export interface Exercises {
  byId: {
    [propName: string]: Exercise,
  };
  allIds: string[];
  stretchExerciseIds: string[];
}

export interface ActivityStats {
  name: string;
  exercises: Activity[];
}

export const isTimed = (activity: Activity): activity is TimedActivity => {
  return (activity as TimedActivity).timerInSeconds !== undefined;
};
