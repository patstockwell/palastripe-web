import {
  WorkoutOutline, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/benchpress.jpg';

const pushAndPull: WorkoutOutline = {
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
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'band_pass_through',
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
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'bench_press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'bench_press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'bench_press',
          weightInKilos: 40,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin_up',
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
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'concentration_curl',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },

        {
          id: 'upright_row',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'concentration_curl',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },

        {
          id: 'upright_row',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'concentration_curl',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },

        {
          id: 'upright_row',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'concentration_curl',
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
          timerInSeconds: 45,
        },
        {
          id: 'right_leg_hamstring_stretch',
          timerInSeconds: 45,
        },
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

export default pushAndPull;
