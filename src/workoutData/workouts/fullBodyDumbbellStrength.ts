import { Workout } from '../../reducers/workoutsReducer';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/bicep-workout-1851820.jpg';

export const fullBodyDumbbellStrength: Workout = {
  id: 'full-body-dumbbell-strength',
  name: 'Full Body Dumbbell Strength',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'aa10b2a3-6a6a-4010-9ac3-81f45f9dd727',
      name: 'Warm Up',
      exercises: [
        {
          id: 'sit_ups',
          name: 'Sit Ups',
          timerInSeconds: 60,
        },
      ],
    },

    {
      id: '63dca883-a3d4-4bbd-a0dc-3e993fde17d7',
      name: 'exercises',
      exercises: [
        {
          id: 'straight_leg_dumbbell_deadlift',
          name: 'Straight-leg Dumbbell Deadlift',
          weightInKilos: 15,
          repsGoal: 8,
          repsAchieved: 8,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'straight_leg_dumbbell_deadlift',
          name: 'Straight-leg Dumbbell Deadlift',
          weightInKilos: 15,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'straight_leg_dumbbell_deadlift',
          name: 'Straight-leg Dumbbell Deadlift',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'dumbbell_overhead_press',
          name: 'Dumbbell Overhead Press',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'dumbbell_overhead_press',
          name: 'Dumbbell Overhead Press',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'dumbbell_overhead_press',
          name: 'Dumbbell Overhead Press',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'bicep_curl',
          name: 'Bicep Curl',
          weightInKilos: 15,
          repsGoal: 6,
          repsAchieved: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'bicep_curl',
          name: 'Bicep Curl',
          weightInKilos: 15,
          repsGoal: 6,
          repsAchieved: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'bicep_curl',
          name: 'Bicep Curl',
          weightInKilos: 15,
          repsGoal: 6,
          repsAchieved: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
      ],
    },
    {
      id: 'bd2fc6bb-ecbd-4e61-9cd3-fe2b9cd27260',
      name: 'stretch',
      exercises: [
        {
          id: 'right_arm_cross_body_stretch',
          name: 'Right Arm Cross Body',
          timerInSeconds: 60,
        },
        {
          id: 'left_arm_cross_body_stretch',
          name: 'Left Arm Cross Body',
          timerInSeconds: 60,
        },
        {
          id: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 60,
        },
        {
          id: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 60,
        },
      ],
    },
  ],
};
