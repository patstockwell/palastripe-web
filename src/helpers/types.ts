export interface ReduxAction<P> {
  type: string;
  payload: P;
}

export interface SingleSetAction {
  groupId: string;
  index: number;
}

// State shape
export interface State {
  activeWorkout?: Workout;
  immediate: boolean;
  scrollY: ScrollY;
  settings: Settings;
  entities: Entities;
  history: Workout[];
  newWorkout?: NewWorkout;
}

export interface ScrollY {
  WORKOUTS: number;
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

export interface NewWorkout {
  id?: string;
  imageUrl?: string;
  name?: string;
  exerciseGroups: WorkoutActivityGroup[];
  version?: string;
}

export interface WorkoutActivityGroup {
  id: string;
  name: string;
  exercises: Activity[];
}

export interface TimedActivity {
  id: string;
  name?: string;
  restPeriodInSeconds?: number;
  timerInSeconds: number;
  completed?: boolean;
}

export interface WeightedActivity {
  id: string;
  name?: string;
  restPeriodInSeconds?: number;
  weightInKilos: number;
  repsGoal: number;
  repsAchieved?: number;
  completed?: boolean;
  autoIncrement: number;
}

export type Activity = WeightedActivity | TimedActivity;

export interface Exercises {
  byId: {
    [propName: string]: Exercise,
  },
  allIds: string[],
}

export interface Exercise {
  id: string,
  name: string,
  mostWeightInKilos?: number,
}

export const isTimed = (activity: Activity): activity is TimedActivity => {
  return (<TimedActivity>activity).timerInSeconds !== undefined;
};

