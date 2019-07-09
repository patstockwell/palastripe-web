import {
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/athlete-biceps-body-136405.jpg';

const topHalfBurner: Workout = {
  id: 'upper_body_burner',
  name: 'Upper Body Burner',
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
          id: 'scissor-jumps',
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
          id: 'dumbbell-bench-press',
          weightInKilos: 20,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin-up',
          weightInKilos: 0,
          repsGoal: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell-bench-press',
          weightInKilos: 25,
          repsGoal: 8,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin-up',
          weightInKilos: 0,
          repsGoal: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell-bench-press',
          weightInKilos: 27.5,
          repsGoal: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin-up',
          weightInKilos: 0,
          repsGoal: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell-bench-press',
          weightInKilos: 30,
          repsGoal: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'chin-up',
          weightInKilos: 0,
          repsGoal: 4,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell-bench-press',
          weightInKilos: 32.5,
          repsGoal: 1,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'standing-bicep-hammer-curls',
          weightInKilos: 12.5,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'face-pulls',
          weightInKilos: 3,
          repsGoal: 15,
          restPeriodInSeconds: 45,
          autoIncrement: 0,
        },
        {
          id: 'standing-bicep-hammer-curls',
          weightInKilos: 12.5,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'face-pulls',
          weightInKilos: 3,
          repsGoal: 15,
          restPeriodInSeconds: 45,
          autoIncrement: 0,
        },
        {
          id: 'standing-bicep-hammer-curls',
          weightInKilos: 12.5,
          repsGoal: 10,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'face-pulls',
          weightInKilos: 3,
          repsGoal: 15,
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
          id: 'right-arm-cross-body-stretch',
          timerInSeconds: 60,
        },
        {
          id: 'left-arm-cross-body-stretch',
          timerInSeconds: 60,
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
};

export default topHalfBurner;
