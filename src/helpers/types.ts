import { Action } from '@reduxjs/toolkit';
import { Profile } from '../reducers/profileReducer';
import { Settings } from '../reducers/settingsReducer';
import { Workout, Workouts } from '../reducers/workoutsReducer';

export interface ReduxAction<P> extends Action {
  payload?: P;
}

export interface SingleSetAction {
  groupId: string;
  index: number;
}

// State shape
export interface State {
  activeWorkout: Workout | null;
  profile: Profile;
  settings: Settings;
  workouts: Workouts;
  history: Workout[];
  editableWorkout?: Workout;
  editableActivity?: WeightedActivity & TimedActivity;
}

// Activity stuff

export interface TimedActivity {
  exerciseId: string;
  name: string;
  id: string;
  restPeriodInSeconds?: number;
  completed?: boolean;
  timerInSeconds: number;
}

export interface WeightedActivity {
  exerciseId: string;
  name: string;
  id: string;
  restPeriodInSeconds?: number;
  completed?: boolean;
  weightInKilos: number;
  repsGoal?: number;
  repsAchieved: number;
  autoIncrement: number;
}

export interface Exercise {
  id: string;
  name: string;
  defaultWeightInKilos: number;
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
