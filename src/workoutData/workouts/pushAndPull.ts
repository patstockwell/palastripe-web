import { Workout } from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/benchpress.jpg';

const pushAndPull: Workout = {
  id: 'push-and-pull',
  name: 'Push And Pull',
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
          id: 'band_pass_through',
          name: 'Band Pass Through',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
      ],
    },

    {
      id: 'press_and_raise',
      name: 'Press And Raise',
      exercises: [
        {
          id: 'bench_press',
          name: 'Bench Press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'bench_press',
          name: 'Bench Press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'bench_press',
          name: 'Bench Press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
          name: 'Chin Ups',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'bench_press',
          name: 'Bench Press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
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
      id: 'row_and_curl',
      name: 'Row And Curl',
      exercises: [
        {
          id: 'upright_row',
          name: 'Upright Row',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: 'upright_row',
          name: 'Upright Row',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },

        {
          id: 'upright_row',
          name: 'Upright Row',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'concentration_curl',
          name: 'Concentration Curl',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },

        {
          id: 'upright_row',
          name: 'Upright Row',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'concentration_curl',
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
      id: 'stretch',
      exercises: [
        {
          id: 'left_leg_hamstring_stretch',
          name: 'Left Leg Hamstring stretch',
          timerInSeconds: 45,
        },
        {
          id: 'right_leg_hamstring_stretch',
          name: 'Right Leg Hamstring stretch',
          timerInSeconds: 45,
        },
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
        {
          id: 'overhead_band_chest_stretch',
          name: 'Overhead Band Chest Stretch',
          timerInSeconds: 60,
        },
      ],
    },
  ],
};

export default pushAndPull;
