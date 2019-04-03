export interface WorkingSet {
  id: string,
  weightInKilos: number,
  maxReps: number,
  completedReps: number,
  autoIncrement: number,
}

// State shape
export interface State {
  activeWorkout?: Workout;
  settings: Settings;
  entities: Entities;
  history: Workout[];
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
  startTime?: number;
  finishTime?: number;
  name: string;
  exercises: WorkoutActivities;
}

export interface WorkoutActivities {
  warmUp?: Activity[];
  sets: Activity[];
  stretch?: Activity[];
  allExerciseIds: string[];
}

export interface TimedActivity {
  id: string;
  name?: string;
  timerInSeconds: number;
  completed: boolean;
}

export interface WeightedActivity {
  id: string;
  name?: string;
  weightInKilos: number;
  repsGoal: number;
  completedReps: number;
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
