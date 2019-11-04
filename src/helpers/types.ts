export interface ReduxAction<P> {
  type: string;
  payload?: P;
}

export interface SingleSetAction {
  groupId: string;
  index: number;
}

export interface SelectedExercise {
  groupId: string | null;
  index: number | null;
}

export interface RouteState {
  immediate: boolean;
  backPath?: string;
}

// State shape
export interface State {
  activeWorkout?: Workout;
  activeWorkoutSelectedExercise: SelectedExercise;
  scrollY: ScrollY;
  profile: Profile;
  settings: Settings;
  entities: Entities;
  history: Workout[];
  editableWorkout?: Workout;
  editableActivity?: WeightedActivity & TimedActivity;
}

export interface ScrollY {
  WORKOUTS_PAGE?: number;
  ACTIVITY_PAGE?: number;
}

export interface Profile {
  firstName: string;
  lastName: string;
}

export interface Settings {
  useKilos: boolean;
}

export interface Entities {
  exercises: Exercises;
  workouts: Workouts;
}

export interface Workouts {
  byId: {
    [propName: string]: Workout,
  };
  allIds: string[];
}

interface WorkoutBase {
  id: string;
  imageUrl?: string;
  startTime?: number;
  finishTime?: number;
  name: string;
  version?: string;
}

export interface Workout extends WorkoutBase {
  exerciseGroups: ActivityGroup[];
}

export interface WorkoutOutline extends WorkoutBase {
  exerciseGroups: ActivityOutlineGroup[];
}

export interface ActivityGroup {
  id: string;
  name: string;
  exercises: Activity[];
}

export interface ActivityOutlineGroup {
  id: string;
  name: string;
  exercises: ActivityOutline[];
}

// Activity stuff

interface ActivityBase {
  id: string;
  restPeriodInSeconds?: number;
  completed?: boolean;
}

interface TimedActivityOutline extends ActivityBase {
  timerInSeconds: number;
}

interface WeightedActivityOutline extends ActivityBase {
  weightInKilos: number;
  repsGoal: number;
  repsAchieved: number;
  autoIncrement: number;
}

export interface Exercise {
  id: string;
  name: string;
  mostWeightInKilos?: number;
  tags: string[];
}

export type TimedActivity = TimedActivityOutline & Exercise;
export type WeightedActivity = WeightedActivityOutline & Exercise;

export type Activity = WeightedActivity | TimedActivity;
export type ActivityOutline = WeightedActivityOutline | TimedActivityOutline;

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
