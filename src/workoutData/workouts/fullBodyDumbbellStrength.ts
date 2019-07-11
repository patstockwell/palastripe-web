import {
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/bicep-workout-1851820.jpg';

const fullBodyDumbbellStrength: Workout = {
  id: 'full-body-dumbbell-strength',
  urlPathName: 'full-body-dumbbell-strength',
  name: 'Full Body Dumbbell Strength',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'WARM_UP',
      name: 'Warm Up',
      exercises: [
        {
          id: 'sit-ups',
          timerInSeconds: 60,
        },
      ],
    },

    {
      id: 'EXERCISES',
      name: 'exercises',
      exercises: [
        {
          id: 'straight-leg-dumbbell-deadlift',
          weightInKilos: 15,
          repsGoal: 8,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'straight-leg-dumbbell-deadlift',
          weightInKilos: 15,
          repsGoal: 10,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'straight-leg-dumbbell-deadlift',
          weightInKilos: 15,
          repsGoal: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'dumbbell-overhead-press',
          weightInKilos: 15,
          repsGoal: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'dumbbell-overhead-press',
          weightInKilos: 15,
          repsGoal: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'dumbbell-overhead-press',
          weightInKilos: 15,
          repsGoal: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'bicep-curl',
          weightInKilos: 15,
          repsGoal: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'bicep-curl',
          weightInKilos: 15,
          repsGoal: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
        {
          id: 'bicep-curl',
          weightInKilos: 15,
          repsGoal: 6,
          autoIncrement: 2.5,
          restPeriodInSeconds: 60,
        },
      ],
    },
    {
      id: 'STRETCH',
      name: 'stretch',
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
      ],
    },
  ],
};

export default fullBodyDumbbellStrength;
