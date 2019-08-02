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

// State shape
export interface State {
  isFirstRender: boolean;
  activeWorkout?: Workout;
  activeWorkoutSelectedExercise: SelectedExercise;
  immediate: boolean;
  scrollY: ScrollY;
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

export interface Workout {
  id: string;
  imageUrl?: string;
  startTime?: number;
  finishTime?: number;
  name: string;
  exerciseGroups: WorkoutActivityGroup[];
  version?: string;
}

export interface WorkoutActivityGroup {
  id: string;
  name: string;
  exercises: Activity[];
}

export interface TimedActivity {
  // common
  id: string;
  name?: string;
  restPeriodInSeconds?: number;
  completed?: boolean;
  // unique
  timerInSeconds: number;
}

export interface WeightedActivity {
  // common
  id: string;
  name?: string;
  restPeriodInSeconds?: number;
  completed?: boolean;
  // unique
  weightInKilos: number;
  repsGoal: number;
  repsAchieved?: number;
  autoIncrement: number;
}

export type Activity = WeightedActivity | TimedActivity;

export interface Exercises {
  byId: {
    [propName: string]: Exercise,
  };
  allIds: string[];
}

export interface Exercise {
  id: string;
  name: string;
  mostWeightInKilos?: number;
}

export const isTimed = (activity: Activity): activity is TimedActivity => {
  return (activity as TimedActivity).timerInSeconds !== undefined;
};
