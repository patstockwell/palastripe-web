import {
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/athlete-biceps-body-136405.jpg';

const overheadStrength: Workout = {
  id: 'overhead_strength',
  name: 'Overhead Strength',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'warm-up',
      name: 'Warm Up',
      exercises: [
        {
          id: 'sit-ups',
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
          id: 'overhead-press',
          weightInKilos: 20,
          repsGoal: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'concentration_curl',
          weightInKilos: 12.5,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead-press',
          weightInKilos: 30,
          repsGoal: 8,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'concentration_curl',
          weightInKilos: 12.5,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead-press',
          weightInKilos: 40,
          repsGoal: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'concentration_curl',
          weightInKilos: 15,
          repsGoal: 8,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead-press',
          weightInKilos: 50,
          repsGoal: 1,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'concentration_curl',
          weightInKilos: 12.5,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
      ],
    },
    {
      name: 'Press Superset 2',
      id: 'press_superset_2',
      exercises: [
        {
          id: 'push_ups',
          weightInKilos: 0,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'machine_chest_flys',
          weightInKilos: 7,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'push_ups',
          weightInKilos: 0,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'machine_chest_flys',
          weightInKilos: 7,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'push_ups',
          weightInKilos: 0,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'machine_chest_flys',
          weightInKilos: 7,
          repsGoal: 10,
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
          id: 'right-arm-cross-body-stretch',
          timerInSeconds: 60,
        },
        {
          id: 'left-arm-cross-body-stretch',
          timerInSeconds: 60,
        },
        {
          id: 'right_leg_hamstring_stretch',
          timerInSeconds: 45,
        },
        {
          id: 'left_leg_hamstring_stretch',
          timerInSeconds: 45,
        },
        {
          id: 'left-glute-pigeon-pose-stretch',
          timerInSeconds: 60,
        },
        {
          id: 'right-glute-pigeon-pose-stretch',
          timerInSeconds: 60,
        },
        {
          id: 'overhead-band-chest-stretch',
          timerInSeconds: 60,
        },
      ],
    },
  ],
}

export default overheadStrength;
