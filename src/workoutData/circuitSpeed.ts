import { Workout } from '../helpers/types';

const circuitSpeed: Workout = {
  id: 'circuit_speed',
  name: 'Circuit Speed',
  exercises: {
    warmUp: [
      {
        id: 'sit_ups',
        completed: false,
        timerInSeconds: 60,
      }
    ],
    sets: [
      {
        id: 'upright_row',
        autoIncrement: 0,
        completedReps: 0,
        repsGoal: 10,
        weightInKilos: 30,
      },
    ],
    stretch: [
      {
        id: 'right_arm_cross_body_stretch',
        timerInSeconds: 60,
        completed: false,
      },
      {
        id: 'left_arm_cross_body_stretch',
        timerInSeconds: 60,
        completed: false,
      },
      {
        id: 'left_glute_pigeon_pose_stretch',
        timerInSeconds: 60,
        completed: false,
      },
      {
        id: 'right_glute_pigeon_pose_stretch',
        timerInSeconds: 60,
        completed: false,
      },
    ],
    allExerciseIds: [
      'sit_ups',
      'upright_row',
      'right_arm_cross_body_stretch',
      'left_arm_cross_body_stretch',
      'right_glute_pigeon_pose_stretch',
      'left_glute_pigeon_pose_stretch',
    ],
  },
};

export default circuitSpeed;
