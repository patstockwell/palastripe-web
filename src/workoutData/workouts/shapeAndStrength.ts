import uuidv4 from 'uuid/v4';
import { Workout } from '../../reducers/workoutsReducer';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/overhead-press.jpg';

export const shapeAndStrength: Workout = {
  id: 'shape-and-strength',
  name: 'Shape And Strength',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'd55f682b-6540-448b-b56b-b4a576f5a100',
      name: 'Warm Up',
      exercises: [
        {
          instanceId: uuidv4(),
          id: 'toe_touches',
          name: 'Toe Touches',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          id: 'lunges',
          name: 'Lunges',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
      ],
    },
    {
      id: '53f0a8db-b433-4536-ad77-36731d6377ed',
      name: 'Press Superset 1',
      exercises: [
        {
          instanceId: uuidv4(),
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          instanceId: uuidv4(),
          id: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          instanceId: uuidv4(),
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          instanceId: uuidv4(),
          id: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },

        {
          instanceId: uuidv4(),
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          instanceId: uuidv4(),
          id: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },

        {
          instanceId: uuidv4(),
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          instanceId: uuidv4(),
          id: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },
      ],
    },

    {
      name: 'Press Superset 2',
      id: '59c6029f-1585-4f47-bd0d-6742352ab999',
      exercises: [
        {
          instanceId: uuidv4(),
          id: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
      ],
    },
    {
      name: 'Stretch',
      id: 'fade0a2a-831b-4576-903e-2af55d34df8c',
      exercises: [
        {
          instanceId: uuidv4(),
          id: 'right_arm_cross_body_stretch',
          name: 'Right Arm Cross Body',
          timerInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'left_arm_cross_body_stretch',
          name: 'Left Arm Cross Body',
          timerInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 60,
        },
        {
          instanceId: uuidv4(),
          id: 'overhead_band_chest_stretch',
          name: 'Overhead Band Chest Stretch',
          timerInSeconds: 60,
        },
      ],
    },
  ],
};
