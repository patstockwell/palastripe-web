import {
  WorkoutOutline, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/athlete-barbell-biceps-497934.jpg';

const squatAndBench: WorkoutOutline = {
  id: 'squat-and-bench',
  name: 'Squat And Bench',
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
      id: 'squat_and_curl',
      name: 'Squat & Curl',
      exercises: [
        {
          id: 'back_squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 40,
          restPeriodInSeconds: 30,
        },
        {
          id: 'concentration_curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 12.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'back_squat',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'concentration_curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 12.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'back_squat',
          repsGoal: 6,
          repsAchieved: 6,
          autoIncrement: 2.5,
          weightInKilos: 70,
          restPeriodInSeconds: 30,
        },
        {
          id: 'concentration_curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 12.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'back_squat',
          repsGoal: 3,
          repsAchieved: 3,
          autoIncrement: 2.5,
          weightInKilos: 80,
          restPeriodInSeconds: 30,
        },
        {
          id: 'concentration_curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 12.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'back_squat',
          repsGoal: 1,
          repsAchieved: 1,
          autoIncrement: 2.5,
          weightInKilos: 90,
          restPeriodInSeconds: 30,
        },
        {
          id: 'concentration_curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 12.5,
          restPeriodInSeconds: 60,
        },
      ],
    },

    {
      name: 'Bench Press & Skull Crushers',
      id: 'bench_press_and_skull_crushers',
      exercises: [
        {
          id: 'bench_press',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: 'skull_crushers',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 60,
        },

        {
          id: 'bench_press',
          repsGoal: 8,
          repsAchieved: 8,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 60,
        },
        {
          id: 'skull_crushers',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 60,
        },

        {
          id: 'bench_press',
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 2.5,
          weightInKilos: 70,
          restPeriodInSeconds: 60,
        },
        {
          id: 'skull_crushers',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 60,
        },

        {
          id: 'bench_press',
          repsGoal: 1,
          repsAchieved: 1,
          autoIncrement: 2.5,
          weightInKilos: 75,
          restPeriodInSeconds: 60,
        },
        {
          id: 'skull_crushers',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 20,
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
          id: 'kneeling_right_hip_flexor_stretch',
          timerInSeconds: 45,
        },
        {
          id: 'kneeling_left_hip_flexor_stretch',
          timerInSeconds: 45,
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

export default squatAndBench;
