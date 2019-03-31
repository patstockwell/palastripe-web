import { Workout } from '../helpers/types';

const fullBodyDumbbellStrength: Workout = {
  id: 'full_body_dumbbell_strength',
  name: 'Full Body Dumbbell Strength',
  exercises: {
    warmUp: [
      {
        id: 'sit_ups',
        timerInSeconds: 60,
        completed: false,
      },
    ],
    sets: [
      {
        id: 'straight_leg_dumbbell_deadlift',
        weightInKilos: 15,
        repsGoal: 8,
        completedReps: undefined,
        autoIncrement: 2.5,
      },
      {
        id: 'straight_leg_dumbbell_deadlift',
        weightInKilos: 15,
        repsGoal: 10,
        completedReps: undefined,
        autoIncrement: 2.5,
      },
      {
        id: 'straight_leg_dumbbell_deadlift',
        weightInKilos: 15,
        repsGoal: 12,
        completedReps: undefined,
        autoIncrement: 2.5,
      },
      {
        id: 'dumbbell_overhead_press',
        weightInKilos: 15,
        repsGoal: 12,
        completedReps: undefined,
        autoIncrement: 2.5,
      },
      {
        id: 'dumbbell_overhead_press',
        weightInKilos: 15,
        repsGoal: 12,
        completedReps: undefined,
        autoIncrement: 2.5,
      },
      {
        id: 'dumbbell_overhead_press',
        weightInKilos: 15,
        repsGoal: 12,
        completedReps: undefined,
        autoIncrement: 2.5,
      },
      {
        id: 'bicep_curl',
        weightInKilos: 15,
        repsGoal: 6,
        completedReps: undefined,
        autoIncrement: 2.5,
      },
      {
        id: 'bicep_curl',
        weightInKilos: 15,
        repsGoal: 6,
        completedReps: undefined,
        autoIncrement: 2.5,
      },
      {
        id: 'bicep_curl',
        weightInKilos: 15,
        repsGoal: 6,
        completedReps: undefined,
        autoIncrement: 2.5,
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
      'bicep_curl',
      'straight_leg_dumbbell_deadlift',
      'dumbbell_overhead_press',
      'sit_ups',
      'right_arm_cross_body_stretch',
      'left_arm_cross_body_stretch',
      'left_glute_pigeon_pose_stretch',
      'right_glute_pigeon_pose_stretch',
    ],
  },
};

export default fullBodyDumbbellStrength;
