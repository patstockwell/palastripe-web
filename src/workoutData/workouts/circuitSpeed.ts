import { Workout } from '../../reducers/workoutsReducer';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/active-body-crossfit-1533897.jpg';

export const circuitSpeed: Workout = {
  id: 'circuit-speed',
  name: 'Circuit Speed',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: '37263956-3c6b-4fad-a1db-d561331f1679',
      name: 'warm up',
      exercises: [
        {
          id: 'sit_ups',
          timerInSeconds: 60,
          name: 'Sit Ups',
        },
      ],
    },
    {
      id: 'f93991d8-ce32-4ded-979d-5927bf819642',
      name: 'working sets',
      exercises: [
        {
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 10,
          repsAchieved: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
          name: 'Upright Row',
        },
        {
          name: 'Upright Row',
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 10,
          repsAchieved: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
        },
        {
          name: 'Upright Row',
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 10,
          repsAchieved: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
        },
        {
          name: 'Upright Row',
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 10,
          repsAchieved: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
        },

      ],
    },
    {
      id: '96e7b9a9-b417-4405-87ea-63b876e923f5',
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
