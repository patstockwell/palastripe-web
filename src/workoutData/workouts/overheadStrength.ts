import { Workout } from '../../reducers/workoutsReducer';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/athlete-barbell-body-931321.jpg';

const overheadStrength: Workout = {
  id: 'overhead-strength',
  name: 'Overhead Strength',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: '706601c7-d966-4f99-8172-77a1957fc1e3',
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
      id: '0ee1a57b-6dfc-43fb-95c9-f17597660a96',
      name: 'Press Superset 1',
      exercises: [
        {
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 12.5,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 30,
          repsGoal: 8,
          repsAchieved: 8,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 12.5,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 40,
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 15,
          repsGoal: 8,
          repsAchieved: 8,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 50,
          repsGoal: 1,
          repsAchieved: 1,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 12.5,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
      ],
    },
    {
      name: 'Press Superset 2',
      id: '07e22d5d-75d8-4414-bcfc-4d879d9fee79',
      exercises: [
        {
          id: 'push_ups',
          name: 'Push Ups',
          weightInKilos: 0,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'machine_chest_flys',
          name: 'Machine Chest Flys',
          weightInKilos: 7,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'push_ups',
          name: 'Push Ups',
          weightInKilos: 0,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'machine_chest_flys',
          name: 'Machine Chest Flys',
          weightInKilos: 7,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'push_ups',
          name: 'Push Ups',
          weightInKilos: 0,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'machine_chest_flys',
          name: 'Machine Chest Flys',
          weightInKilos: 7,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
      ],
    },
    {
      name: 'Stretch',
      id: '61a1c4a9-9116-4ac8-b74b-25d19b11fb62',
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
          id: 'right_leg_hamstring_stretch',
          name: 'Right Leg Hamstring stretch',
          timerInSeconds: 45,
        },
        {
          id: 'left_leg_hamstring_stretch',
          name: 'Left Leg Hamstring stretch',
          timerInSeconds: 45,
        },
        {
          id: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 60,
        },
        {
          id: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 60,
        },
        {
          id: 'overhead_band_chest_stretch',
          name: 'Overhead Band Chest Stretch',
          timerInSeconds: 60,
        },
      ],
    },
  ],
};

export default overheadStrength;
