import { v4 as uuidv4 } from 'uuid';
import { Workout } from '../../reducers/workoutsReducer';
import { WORKOUT_VERSION } from '../../helpers/constants';
import Image from '../../assets/images/bicep-workout-1851820.jpg';

export const fullBodyDumbbellStrength: Workout = {
  id: 'full-body-dumbbell-strength',
  name: 'Full Body Dumbbell Strength',
  description: 'All you need is a pair of dumbbells to combine deadlift, curl, and press in this workout that can be done at home or the gym.',
  imageUrl: Image,
  version: WORKOUT_VERSION,
  exerciseGroups: [
    {
      id: 'aa10b2a3-6a6a-4010-9ac3-81f45f9dd727',
      name: 'Warm Up',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'sit_ups',
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
          id: uuidv4(),
          exerciseId: 'straight_leg_dumbbell_deadlift',
          name: 'Straight-leg Dumbbell Deadlift',
          weightInKilos: 15,
          repsGoal: 8,
          repsAchieved: 8,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'straight_leg_dumbbell_deadlift',
          name: 'Straight-leg Dumbbell Deadlift',
          weightInKilos: 15,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'straight_leg_dumbbell_deadlift',
          name: 'Straight-leg Dumbbell Deadlift',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_overhead_press',
          name: 'Dumbbell Overhead Press',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_overhead_press',
          name: 'Dumbbell Overhead Press',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_overhead_press',
          name: 'Dumbbell Overhead Press',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'bicep_curl',
          name: 'Bicep Curl',
          weightInKilos: 15,
          repsGoal: 6,
          repsAchieved: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'bicep_curl',
          name: 'Bicep Curl',
          weightInKilos: 15,
          repsGoal: 6,
          repsAchieved: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'bicep_curl',
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
          id: uuidv4(),
          exerciseId: 'right_arm_cross_body_stretch',
          name: 'Right Arm Cross Body',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'left_arm_cross_body_stretch',
          name: 'Left Arm Cross Body',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
      ],
    },
  ],
};
