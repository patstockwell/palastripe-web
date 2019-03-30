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

interface Settings {
  useKilos: boolean;
}

interface Entities {
  exercises: Exercises;
  workouts: Workouts;
}

interface Workouts {
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
  exercises: {
    warmUp: (TimedActivity[] | WeightedActivity[]);
    sets: (TimedActivity[] | WeightedActivity[]);
    stretch: (TimedActivity[] | WeightedActivity[]);
    allExerciseIds: string[];
  };
}

interface TimedActivity {
  id: string;
  name?: string;
  timerInSeconds: number;
  completed: boolean;
}

interface WeightedActivity {
  id: string;
  name?: string;
  weightInKilos: number;
  maxReps: number;
  completedReps: number;
  autoIncrement: number;
}

interface Exercises {
  byId: {
    [propName: string]: Exercise,
  },
  allIds: string[],
}

interface Exercise {
  id: string,
  name: string,
  mostWeightInKilos?: number,
}
