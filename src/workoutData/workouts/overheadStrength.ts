import { Workout } from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/athlete-barbell-body-931321.jpg';

const overheadStrength: Workout = {
  id: 'overhead-strength',
  name: 'Overhead Strength',
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
      id: 'press_superset_1',
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
      id: 'press_superset_2',
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
      id: 'stretch',
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
