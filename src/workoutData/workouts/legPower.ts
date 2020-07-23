import { Workout } from '../../reducers/workoutsReducer';
import { v4 as uuidv4 } from 'uuid';
import { WORKOUT_VERSION } from '../../helpers/constants';
import Image from '../../assets/images/squat.jpg';

export const legPower: Workout = {
  id: 'leg-power',
  name: 'Leg Power',
  imageUrl: Image,
  version: WORKOUT_VERSION,
  exerciseGroups: [
    {
      id: 'b022809e-418e-4d53-93e7-f77fecb95909',
      name: 'Warm Up',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'sit_ups',
          name: 'Sit Ups',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'lunges',
          name: 'Lunges',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
      ],

    },

    {
      id: 'e65433eb-2e1d-4c10-bd0e-ab0ac2191a48',
      name: 'Posterior Chain',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'ez_bar_curl',
          name: 'EZ Bar Curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 15,
          restPeriodInSeconds: 30,
        },

        {
          id: uuidv4(),
          exerciseId: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'ez_bar_curl',
          name: 'EZ Bar Curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 15,
          restPeriodInSeconds: 30,
        },

        {
          id: uuidv4(),
          exerciseId: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'ez_bar_curl',
          name: 'EZ Bar Curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 15,
          restPeriodInSeconds: 30,
        },

        {
          id: uuidv4(),
          exerciseId: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'ez_bar_curl',
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
      id: '772e9e1f-8c2a-4adf-8f3e-53e8944e0809',
      name: 'Core Strength',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'chest_dips',
          name: 'Chest Dips',
          repsGoal: 7,
          repsAchieved: 7,
          autoIncrement: 0,
          weightInKilos: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'chest_dips',
          name: 'Chest Dips',
          repsGoal: 7,
          repsAchieved: 7,
          autoIncrement: 0,
          weightInKilos: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: uuidv4(),
          name: 'Back Squat',
          exerciseId: 'back_squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'chest_dips',
          name: 'Chest Dips',
          repsGoal: 7,
          repsAchieved: 7,
          autoIncrement: 0,
          weightInKilos: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'chest_dips',
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
      id: '0f191e50-0dfb-48e6-a154-7d0c06ffc67a',
      name: 'Stretch',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'left_leg_hamstring_stretch',
          name: 'Left Leg Hamstring stretch',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'right_leg_hamstring_stretch',
          name: 'Right Leg Hamstring stretch',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'kneeling_left_hip_flexor_stretch',
          name: 'Kneeling Left Hip-Flexor Stretch',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'kneeling_right_hip_flexor_stretch',
          name: 'Kneeling Right Hip-Flexor Stretch',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'overhead_band_chest_stretch',
          name: 'Overhead Band Chest Stretch',
          timerInSeconds: 45,
        },
      ],
    },
  ],
};