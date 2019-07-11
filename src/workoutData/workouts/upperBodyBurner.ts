import {
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/athlete-biceps-body-136405.jpg';

const topHalfBurner: Workout = {
  id: 'upper_body_burner',
  urlPathName: 'upper-body-burner',
  name: 'Upper Body Burner',
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
          id: 'scissor_jumps',
          timerInSeconds: 30,
          restPeriodInSeconds: 30,
        },
      ],
    },

    {
      id: 'exercises',
      name: 'Exercises',
      exercises: [
        {
          id: 'dumbbell_bench_press',
          weightInKilos: 20,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
          weightInKilos: 0,
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell_bench_press',
          weightInKilos: 25,
          repsGoal: 8,
          repsAchieved: 8,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
          weightInKilos: 0,
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell_bench_press',
          weightInKilos: 27.5,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
          weightInKilos: 0,
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell_bench_press',
          weightInKilos: 30,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
          weightInKilos: 0,
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell_bench_press',
          weightInKilos: 32.5,
          repsGoal: 1,
          repsAchieved: 1,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'standing_bicep_hammer_curls',
          weightInKilos: 12.5,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'face_pulls',
          weightInKilos: 3,
          repsGoal: 15,
          repsAchieved: 15,
          restPeriodInSeconds: 45,
          autoIncrement: 0,
        },
        {
          id: 'standing_bicep_hammer_curls',
          weightInKilos: 12.5,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'face_pulls',
          weightInKilos: 3,
          repsGoal: 15,
          repsAchieved: 15,
          restPeriodInSeconds: 45,
          autoIncrement: 0,
        },
        {
          id: 'standing_bicep_hammer_curls',
          weightInKilos: 12.5,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'face_pulls',
          weightInKilos: 3,
          repsGoal: 15,
          repsAchieved: 15,
          restPeriodInSeconds: 45,
          autoIncrement: 0,
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

export default topHalfBurner;
