import {v4 as uuidv4} from 'uuid';
import {Workout} from '../../reducers/workoutsReducer';
import {WORKOUT_VERSION} from '../../helpers/constants';
import Image from '../../assets/images/benchpress.jpg';

export const pushAndPull: Workout = {
  id: 'push-and-pull',
  name: 'Push And Pull',
  description: 'Focusing on four key exercises, this workout will get you pressing, pulling, rowing, and curling.',
  imageUrl: Image,
  version: WORKOUT_VERSION,
  exerciseGroups: [
    {
      id: '9e4ac836-2bf7-4ac0-a467-911c9b4a592e',
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
          exerciseId: 'band_pass_through',
          name: 'Band Pass Through',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
      ],
    },

    {
      id: '9f6b2e42-be67-426d-bc80-e65707f4ccf7',
      name: 'Press And Raise',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'bench_press',
          name: 'Bench Press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: uuidv4(),
          exerciseId: 'bench_press',
          name: 'Bench Press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: uuidv4(),
          exerciseId: 'bench_press',
          name: 'Bench Press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: uuidv4(),
          exerciseId: 'bench_press',
          name: 'Bench Press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
      ],
    },

    {
      id: '3d6774c3-0181-4043-961c-8f59fccda646',
      name: 'Row And Curl',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'bent_over_row',
          name: 'Bent-over Row',
          weightInKilos: 30,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: uuidv4(),
          exerciseId: 'bent_over_row',
          name: 'Bent-over Row',
          weightInKilos: 30,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },

        {
          id: uuidv4(),
          exerciseId: 'bent_over_row',
          name: 'Bent-over Row',
          weightInKilos: 30,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },

        {
          id: uuidv4(),
          exerciseId: 'bent_over_row',
          name: 'Bent-over Row',
          weightInKilos: 30,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },

      ],
    },

    {
      name: 'Stretch',
      id: '779b159f-9315-4793-8d37-5418596630d9',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'left_leg_hamstring_stretch',
          name: 'Left Leg Hamstring stretch',
          timerInSeconds: 45,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'right_leg_hamstring_stretch',
          name: 'Right Leg Hamstring stretch',
          timerInSeconds: 45,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'right_arm_cross_body_stretch',
          name: 'Right Arm Cross Body',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'left_arm_cross_body_stretch',
          name: 'Left Arm Cross Body',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'overhead_band_chest_stretch',
          name: 'Overhead Band Chest Stretch',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
      ],
    },
  ],
};
