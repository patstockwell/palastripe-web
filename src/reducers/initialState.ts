import { State } from '../helpers/types';
import circuitSpeed from '../workoutData/circuitSpeed';
import fullBodyDumbbellStrength from '../workoutData/fullBodyDumbbellStrength';

const initialState: State = {
  // activeWorkout: undefined

  settings: {
    useKilos: true,
  },

  entities: {
    exercises: {
      byId: {
        'dead-lift': {
          id: 'dead-lift',
          name: 'Dead Lift',
          mostWeightInKilos: undefined,
        },
        'back-squat': {
          id: 'back-squat',
          name: 'Back Squat',
          mostWeightInKilos: undefined,
        },
        'overhead-press': {
          id: 'overhead-press',
          name: 'Overhead Press',
          mostWeightInKilos: undefined,
        },
        'chin-up': {
          id: 'chin-up',
          name: 'Chin-up',
          mostWeightInKilos: undefined,
        },
        'bench-press': {
          id: 'bench-press',
          name: 'Bench Press',
          mostWeightInKilos: undefined,
        },
        'bicep-curl': {
          id: 'bicep-curl',
          name: 'Bicep Curl',
          mostWeightInKilos: undefined,
        },
        'upright-row': {
          id: 'upright-row',
          name: 'Upright Row',
          mostWeightInKilos: undefined,
        },
        'straight-leg-dumbbell-deadlift': {
          id: 'straight-leg-dumbbell-deadlift',
          name: 'Straight-leg Dumbbell Deadlift',
        },
        'dumbbell-overhead-press': {
          id: 'dumbbell-overhead-press',
          name: 'Dumbbell Overhead Press',
        },
        'sit-ups': {
          id: 'sit-ups',
          name: 'Sit-ups',
        },
        'right-arm-cross-body-stretch': {
          id: 'right-arm-cross-body-stretch',
          name: 'Right Arm Cross Body Stretch',
        },
        'left-arm-cross-body-stretch': {
          id: 'left-arm-cross-body-stretch',
          name: 'Left Arm Cross Body Stretch',
        },
        'left-glute-pigeon-pose-stretch': {
          id: 'left-glute-pigeon-pose-stretch',
          name: 'Left Glute Pigeon Pose Stretch',
        },
        'right-glute-pigeon-pose-stretch': {
          id: 'right-glute-pigeon-pose-stretch',
          name: 'Right Glute Pigeon Pose Stretch',
        },
      },
      allIds: [
        'dead-lift',
        'back-squat',
        'overhead-press',
        'chin-up',
        'bench-press',
        'bicep-curl',
        'upright-row',
        'straight-leg-dumbbell-deadlift',
        'dumbbell-overhead-press',
      ],
    },

    workouts: {
      byId: {
        'full-body-dumbbell-strength': { ...fullBodyDumbbellStrength },
        'circuit-speed': { ...circuitSpeed },
      },
      allIds: ['full-body-dumbbell-strength', 'circuit-speed']
    },
  },

  history: [],
};

export default initialState;

