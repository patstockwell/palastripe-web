import {v4 as uuidv4} from 'uuid';
import {Workout} from '../../reducers/workoutsReducer';
import {WORKOUT_VERSION} from '../../helpers/constants';
import Image from '../../assets/images/athlete-barbell-biceps-497934.jpg';

export const squatAndBench: Workout = {
  id: 'squat-and-bench',
  name: 'Squat And Bench',
  imageUrl: Image,
  version: WORKOUT_VERSION,
  exerciseGroups: [
    {
      id: '7cc70a8f-7b50-42d0-b18d-d62e78407631',
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
      id: '6537f1c8-f9a3-4610-9bb6-14d777d1ead1',
      name: 'Squat & Curl',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 40,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'concentration_curl',
          name: 'Concentration Curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 12.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'concentration_curl',
          name: 'Concentration Curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 12.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 6,
          repsAchieved: 6,
          autoIncrement: 2.5,
          weightInKilos: 70,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'concentration_curl',
          name: 'Concentration Curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 12.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 3,
          repsAchieved: 3,
          autoIncrement: 2.5,
          weightInKilos: 80,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'concentration_curl',
          name: 'Concentration Curl',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 12.5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 1,
          repsAchieved: 1,
          autoIncrement: 2.5,
          weightInKilos: 90,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'concentration_curl',
          name: 'Concentration Curl',
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
      id: '16c23437-2097-4905-af35-e1f89a7aaa3a',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'bench_press',
          name: 'Bench Press',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          weightInKilos: 40,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'skull_crushers',
          name: 'Skull Crushers',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 60,
        },

        {
          id: uuidv4(),
          exerciseId: 'bench_press',
          name: 'Bench Press',
          repsGoal: 8,
          repsAchieved: 8,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'skull_crushers',
          name: 'Skull Crushers',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 60,
        },

        {
          id: uuidv4(),
          exerciseId: 'bench_press',
          name: 'Bench Press',
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 2.5,
          weightInKilos: 70,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'skull_crushers',
          name: 'Skull Crushers',
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 60,
        },

        {
          id: uuidv4(),
          exerciseId: 'bench_press',
          name: 'Bench Press',
          repsGoal: 1,
          repsAchieved: 1,
          autoIncrement: 2.5,
          weightInKilos: 75,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'skull_crushers',
          name: 'Skull Crushers',
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
      id: 'd07063e5-36fa-490d-9656-6ca123f8ea0a',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'right_arm_cross_body_stretch',
          name: 'Right Arm Cross Body',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'left_arm_cross_body_stretch',
          name: 'Left Arm Cross Body',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'kneeling_right_hip_flexor_stretch',
          name: 'Kneeling Right Hip-Flexor Stretch',
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
          exerciseId: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'overhead_band_chest_stretch',
          name: 'Overhead Band Chest Stretch',
          timerInSeconds: 60,
        },
      ],
    },
  ],
};
