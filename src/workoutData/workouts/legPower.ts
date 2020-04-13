import { Workout } from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/squat.jpg';

const legPower: Workout = {
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
          name: 'Sit Ups',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'lunges',
          name: 'Lunges',
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
          name: 'Dead Lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'ez_bar_curl',
          name: 'EZ Bar Curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 15,
          restPeriodInSeconds: 30,
        },

        {
          id: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'ez_bar_curl',
          name: 'EZ Bar Curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 15,
          restPeriodInSeconds: 30,
        },

        {
          id: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'ez_bar_curl',
          name: 'EZ Bar Curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 15,
          restPeriodInSeconds: 30,
        },

        {
          id: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'ez_bar_curl',
          name: 'EZ Bar Curl',
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
          name: 'Back Squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: 'chest_dips',
          name: 'Chest Dips',
          repsGoal: 7,
          repsAchieved: 7,
          autoIncrement: 0,
          weightInKilos: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: 'back_squat',
          name: 'Back Squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: 'chest_dips',
          name: 'Chest Dips',
          repsGoal: 7,
          repsAchieved: 7,
          autoIncrement: 0,
          weightInKilos: 0,
          restPeriodInSeconds: 60,
        },

        {
          name: 'Back Squat',
          id: 'back_squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: 'chest_dips',
          name: 'Chest Dips',
          repsGoal: 7,
          repsAchieved: 7,
          autoIncrement: 0,
          weightInKilos: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: 'back_squat',
          name: 'Back Squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: 'chest_dips',
          name: 'Chest Dips',
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
          name: 'Left Leg Hamstring stretch',
          timerInSeconds: 45,
        },
        {
          id: 'right_leg_hamstring_stretch',
          name: 'Right Leg Hamstring stretch',
          timerInSeconds: 45,
        },
        {
          id: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 45,
        },
        {
          id: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 45,
        },
        {
          id: 'kneeling_left_hip_flexor_stretch',
          name: 'Kneeling Left Hip-Flexor Stretch',
          timerInSeconds: 45,
        },
        {
          id: 'kneeling_right_hip_flexor_stretch',
          name: 'Kneeling Right Hip-Flexor Stretch',
          timerInSeconds: 45,
        },
        {
          id: 'overhead_band_chest_stretch',
          name: 'Overhead Band Chest Stretch',
          timerInSeconds: 45,
        },
      ],
    },
  ],
};

export default legPower;
