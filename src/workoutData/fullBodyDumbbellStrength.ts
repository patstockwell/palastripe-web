import { Workout } from '../helpers/types';

const fullBodyDumbbellStrength: Workout = {
  id: 'full-body-dumbbell-strength',
  name: 'Full Body Dumbbell Strength',
  exercises: {
    warmUp: [
      {
        id: 'sit-ups',
        timerInSeconds: 60,
        completed: false,
      },
    ],
    workingSets: [
      {
        id: 'straight-leg-dumbbell-deadlift',
        weightInKilos: 15,
        repsGoal: 8,
        completedReps: undefined,
        autoIncrement: 2.5,
        restPeriodInSeconds: 60,
      },
      {
        id: 'straight-leg-dumbbell-deadlift',
        weightInKilos: 15,
        repsGoal: 10,
        completedReps: undefined,
        autoIncrement: 2.5,
        restPeriodInSeconds: 60,
      },
      {
        id: 'straight-leg-dumbbell-deadlift',
        weightInKilos: 15,
        repsGoal: 12,
        completedReps: undefined,
        autoIncrement: 2.5,
        restPeriodInSeconds: 60,
      },
      {
        id: 'dumbbell-overhead-press',
        weightInKilos: 15,
        repsGoal: 12,
        completedReps: undefined,
        autoIncrement: 2.5,
        restPeriodInSeconds: 60,
      },
      {
        id: 'dumbbell-overhead-press',
        weightInKilos: 15,
        repsGoal: 12,
        completedReps: undefined,
        autoIncrement: 2.5,
        restPeriodInSeconds: 60,
      },
      {
        id: 'dumbbell-overhead-press',
        weightInKilos: 15,
        repsGoal: 12,
        completedReps: undefined,
        autoIncrement: 2.5,
        restPeriodInSeconds: 60,
      },
      {
        id: 'bicep-curl',
        weightInKilos: 15,
        repsGoal: 6,
        completedReps: undefined,
        autoIncrement: 2.5,
        restPeriodInSeconds: 60,
      },
      {
        id: 'bicep-curl',
        weightInKilos: 15,
        repsGoal: 6,
        completedReps: undefined,
        autoIncrement: 2.5,
        restPeriodInSeconds: 60,
      },
      {
        id: 'bicep-curl',
        weightInKilos: 15,
        repsGoal: 6,
        completedReps: undefined,
        autoIncrement: 2.5,
        restPeriodInSeconds: 60,
      },
    ],
    stretch: [
      {
        id: 'right-arm-cross-body-stretch',
        timerInSeconds: 60,
        completed: false,
      },
      {
        id: 'left-arm-cross-body-stretch',
        timerInSeconds: 60,
        completed: false,
      },
      {
        id: 'left-glute-pigeon-pose-stretch',
        timerInSeconds: 60,
        completed: false,
      },
      {
        id: 'right-glute-pigeon-pose-stretch',
        timerInSeconds: 60,
        completed: false,
      },
    ],
    allExerciseIds: [
      'bicep-curl',
      'straight-leg-dumbbell-deadlift',
      'dumbbell-overhead-press',
      'sit-ups',
      'right-arm-cross-body-stretch',
      'left-arm-cross-body-stretch',
      'left-glute-pigeon-pose-stretch',
      'right-glute-pigeon-pose-stretch',
    ],
  },
};

export default fullBodyDumbbellStrength;
