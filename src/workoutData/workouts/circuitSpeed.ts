import {
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/active-body-crossfit-1533897.jpg';

const circuitSpeed: Workout = {
  id: 'circuit-speed',
  urlPathName: 'circuit-speed',
  name: 'Circuit Speed',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'CIRCUIT_SPEED_WARM_UP',
      name: 'warm up',
      exercises: [
        {
          id: 'sit-ups',
          timerInSeconds: 60,
        }
      ],
    },
    {
      id: 'CIRCUIT_SPEED_WORKING_SETS',
      name: 'working sets',
      exercises: [
        {
          id: 'upright-row',
          autoIncrement: 0,
          repsGoal: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
        },
        {
          id: 'upright-row',
          autoIncrement: 0,
          repsGoal: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
        },
        {
          id: 'upright-row',
          autoIncrement: 0,
          repsGoal: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
        },
        {
          id: 'upright-row',
          autoIncrement: 0,
          repsGoal: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
        },

      ],
    },
    {
      id: 'CIRCUIT_SPEED_STRETCH',
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

export default circuitSpeed;
