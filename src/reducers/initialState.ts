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
        'dead_lift': {
          id: 'dead_lift',
          name: 'Dead Lift',
          mostWeightInKilos: undefined,
        },
        'back_squat': {
          id: 'back_squat',
          name: 'Back Squat',
          mostWeightInKilos: undefined,
        },
        'overhead_press': {
          id: 'overhead_press',
          name: 'Overhead Press',
          mostWeightInKilos: undefined,
        },
        'chin_up': {
          id: 'chin_up',
          name: 'Chin-up',
          mostWeightInKilos: undefined,
        },
        'bench_press': {
          id: 'bench_press',
          name: 'Bench Press',
          mostWeightInKilos: undefined,
        },
        'bicep_curl': {
          id: 'bicep_curl',
          name: 'Bicep Curl',
          mostWeightInKilos: undefined,
        },
        'upright_row': {
          id: 'upright_row',
          name: 'Upright Row',
          mostWeightInKilos: undefined,
        },
        'straight_leg_dumbbell_deadlift': {
          id: 'straight_leg_dumbbell_deadlift',
          name: 'Straight-leg Dumbbell Deadlift',
        },
        'dumbbell_overhead_press': {
          id: 'dumbbell_overhead_press',
          name: 'Dumbbell Overhead Press',
        },
        'sit_ups': {
          id: 'sit_ups',
          name: 'Sit-ups',
        },
        'right_arm_cross_body_stretch': {
          id: 'right_arm_cross_body_stretch',
          name: 'Right Arm Cross Body Stretch',
        },
        'left_arm_cross_body_stretch': {
          id: 'left_arm_cross_body_stretch',
          name: 'Left Arm Cross Body Stretch',
        },
        'left_glute_pigeon_pose_stretch': {
          id: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose Stretch',
        },
        'right_glute_pigeon_pose_stretch': {
          id: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose Stretch',
        },
      },
      allIds: [
        'dead_lift',
        'back_squat',
        'overhead_press',
        'chin_up',
        'bench_press',
        'bicep_curl',
        'upright_row',
        'straight_leg_dumbbell_deadlift',
        'dumbbell_overhead_press',
      ],
    },

    workouts: {
      byId: {
        'full_body_dumbbell_strength': { ...fullBodyDumbbellStrength },
        'circuit_speed': { ...circuitSpeed },
      },
      allIds: ['full_body_dumbbell_strength', 'circuit_speed']
    },
  },

  history: [],
};

export default initialState;

