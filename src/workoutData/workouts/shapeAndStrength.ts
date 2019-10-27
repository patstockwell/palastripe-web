import {
  WorkoutOutline, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/overhead-press.jpg';

const shapeAndStrength: WorkoutOutline = {
  id: 'shape-and-strength',
  name: 'Shape And Strength',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'warm_up',
      name: 'Warm Up',
      exercises: [
        {
          id: 'toe_touches',
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
      id: 'press_superset_1',
      name: 'Press Superset 1',
      exercises: [
        {
          id: 'overhead_press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'standing_bicep_curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead_press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'standing_bicep_curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead_press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'standing_bicep_curls',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead_press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'standing_bicep_curls',
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
      id: 'press_superset_2',
      exercises: [
        {
          id: 'butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'hanging_leg_raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          id: 'hanging_leg_raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          id: 'hanging_leg_raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          id: 'hanging_leg_raises',
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
      id: 'stretch',
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
        {
          id: 'overhead_band_chest_stretch',
          timerInSeconds: 60,
        },
      ],
    },
  ],
};

export default shapeAndStrength;
