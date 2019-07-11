import {
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/bicep-workout-1851820.jpg';

const fullBodyDumbbellStrength: Workout = {
  id: 'full_body_dumbbell_strength',
  urlPathName: 'full-body-dumbbell-strength',
  name: 'Full Body Dumbbell Strength',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'WARM_UP',
      name: 'Warm Up',
      exercises: [
        {
          id: 'sit_ups',
          timerInSeconds: 60,
        },
      ],
    },

    {
      id: 'EXERCISES',
      name: 'exercises',
      exercises: [
        {
          id: 'straight_leg_dumbbell_deadlift',
          weightInKilos: 15,
          repsGoal: 8,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'straight_leg_dumbbell_deadlift',
          weightInKilos: 15,
          repsGoal: 10,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'straight_leg_dumbbell_deadlift',
          weightInKilos: 15,
          repsGoal: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'dumbbell_overhead_press',
          weightInKilos: 15,
          repsGoal: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'dumbbell_overhead_press',
          weightInKilos: 15,
          repsGoal: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'dumbbell_overhead_press',
          weightInKilos: 15,
          repsGoal: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'bicep_curl',
          weightInKilos: 15,
          repsGoal: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'bicep_curl',
          weightInKilos: 15,
          repsGoal: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'bicep_curl',
          weightInKilos: 15,
          repsGoal: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
      ],
    },
    {
      id: 'STRETCH',
      name: 'stretch',
      exercises: [
        {
          id: 'right_arm_cross_body_stretch',
          timerInSeconds: 60,
        },
        {
          id: 'left_arm_cross_body_stretch',
          timerInSeconds: 60,
        },
        {
          id: 'left_glute_pigeon_pose_stretch',
          timerInSeconds: 60,
        },
        {
          id: 'right_glute_pigeon_pose_stretch',
          timerInSeconds: 60,
        },
      ],
    },
  ],
};

export default fullBodyDumbbellStrength;
