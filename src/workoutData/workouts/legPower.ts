import {
  WorkoutOutline, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/squat.jpg';

const legPower: WorkoutOutline = {
  id: 'leg-power',
  name: 'Leg Power',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'warm_up',
      name: 'Warm Up',
      exercises: [
        {
          id: 'sit_ups',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'lunges',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
      ],

    },

    {
      id: 'posterior_chain',
      name: 'Posterior Chain',
      exercises: [
        {
          id: 'dead_lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'ez_bar_curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 15,
          restPeriodInSeconds: 30,
        },

        {
          id: 'dead_lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'ez_bar_curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 15,
          restPeriodInSeconds: 30,
        },

        {
          id: 'dead_lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'ez_bar_curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 15,
          restPeriodInSeconds: 30,
        },

        {
          id: 'dead_lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'ez_bar_curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 15,
          restPeriodInSeconds: 30,
        },

      ],
    },

    {
      id: 'core_strength',
      name: 'Core Strength',
      exercises: [
        {
          id: 'back_squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: 'chest_dips',
          repsGoal: 7,
          repsAchieved: 7,
          autoIncrement: 0,
          weightInKilos: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: 'back_squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: 'chest_dips',
          repsGoal: 7,
          repsAchieved: 7,
          autoIncrement: 0,
          weightInKilos: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: 'back_squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: 'chest_dips',
          repsGoal: 7,
          repsAchieved: 7,
          autoIncrement: 0,
          weightInKilos: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: 'back_squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: 'chest_dips',
          repsGoal: 7,
          repsAchieved: 7,
          autoIncrement: 0,
          weightInKilos: 0,
          restPeriodInSeconds: 60,
        },

      ],
    },

    {
      id: 'stretch',
      name: 'Stretch',
      exercises: [
        {
          id: 'left_leg_hamstring_stretch',
          timerInSeconds: 45,
        },
        {
          id: 'right_leg_hamstring_stretch',
          timerInSeconds: 45,
        },
        {
          id: 'left_glute_pigeon_pose_stretch',
          timerInSeconds: 45,
        },
        {
          id: 'right_glute_pigeon_pose_stretch',
          timerInSeconds: 45,
        },
        {
          id: 'kneeling_left_hip_flexor_stretch',
          timerInSeconds: 45,
        },
        {
          id: 'kneeling_right_hip_flexor_stretch',
          timerInSeconds: 45,
        },
        {
          id: 'overhead_band_chest_stretch',
          timerInSeconds: 45,
        },
      ],
    },
  ],
};

export default legPower;
