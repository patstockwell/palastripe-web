import {v4 as uuidv4} from 'uuid';
import {Workout} from '../../reducers/workoutsReducer';
import {WORKOUT_VERSION} from '../../helpers/constants';
import Image from '../../assets/images/athlete-biceps-body-136405.jpg';

export const upperBodyBurner: Workout = {
  id: 'upper-body-burner',
  name: 'Upper Body Burner',
  description: '',
  imageUrl: Image,
  version: WORKOUT_VERSION,
  exerciseGroups: [
    {
      id: '416cee66-9d37-4a0e-828d-5c7db270b8a2',
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
          exerciseId: 'scissor_jumps',
          name: 'Scissor Jumps',
          timerInSeconds: 30,
          restPeriodInSeconds: 30,
        },
      ],
    },

    {
      id: 'e2ed380f-bf2e-4d67-9dfc-d176da1c5442',
      name: 'Exercises',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_bench_press',
          name: 'Dumbbell Bench Press',
          weightInKilos: 20,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_bench_press',
          name: 'Dumbbell Bench Press',
          weightInKilos: 25,
          repsGoal: 8,
          repsAchieved: 8,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_bench_press',
          name: 'Dumbbell Bench Press',
          weightInKilos: 27.5,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_bench_press',
          name: 'Dumbbell Bench Press',
          weightInKilos: 30,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 4,
          repsAchieved: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_bench_press',
          name: 'Dumbbell Bench Press',
          weightInKilos: 32.5,
          repsGoal: 1,
          repsAchieved: 1,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: uuidv4(),
          exerciseId: 'standing_bicep_hammer_curls',
          name: 'Standing Dumbbell Hammer Curls',
          weightInKilos: 12.5,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'face_pulls',
          name: 'Face Pulls',
          weightInKilos: 3,
          repsGoal: 15,
          repsAchieved: 15,
          restPeriodInSeconds: 45,
          autoIncrement: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'standing_bicep_hammer_curls',
          name: 'Standing Dumbbell Hammer Curls',
          weightInKilos: 12.5,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'face_pulls',
          name: 'Face Pulls',
          weightInKilos: 3,
          repsGoal: 15,
          repsAchieved: 15,
          restPeriodInSeconds: 45,
          autoIncrement: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'standing_bicep_hammer_curls',
          name: 'Standing Dumbbell Hammer Curls',
          weightInKilos: 12.5,
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'face_pulls',
          name: 'Face Pulls',
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
      id: 'a8d91722-875b-4fdc-bdec-b7b989298864',
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
