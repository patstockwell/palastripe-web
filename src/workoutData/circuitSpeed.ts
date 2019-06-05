import {
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import Image from '../assets/images/active-body-crossfit-1533897.jpg';

const circuitSpeed: Workout = {
  id: 'circuit-speed',
  name: 'Circuit Speed',
  imageUrl: Image,
  exercises: {
    warmUp: [
      {
        id: 'sit-ups',
        completed: false,
        timerInSeconds: 60,
      }
    ],
    workingSets: [
      {
        id: 'upright-row',
        autoIncrement: 0,
        completed: false,
        repsGoal: 10,
        weightInKilos: 30,
        restPeriodInSeconds: 60,
      },
      {
        id: 'upright-row',
        autoIncrement: 0,
        completed: false,
        repsGoal: 10,
        weightInKilos: 30,
        restPeriodInSeconds: 60,
      },
      {
        id: 'upright-row',
        autoIncrement: 0,
        completed: false,
        repsGoal: 10,
        weightInKilos: 30,
        restPeriodInSeconds: 60,
      },
      {
        id: 'upright-row',
        autoIncrement: 0,
        completed: false,
        repsGoal: 10,
        weightInKilos: 30,
        restPeriodInSeconds: 60,
      },
    ],
    stretch: [
      {
        id: 'right-arm-cross-body-stretch',
        timerInSeconds: 60,
        completed: false,
      },
      {
        id: 'left-arm-cross-body-stretch',
        timerInSeconds: 60,
        completed: false,
      },
      {
        id: 'left-glute-pigeon-pose-stretch',
        timerInSeconds: 60,
        completed: false,
      },
      {
        id: 'right-glute-pigeon-pose-stretch',
        timerInSeconds: 60,
        completed: false,
      },
    ],
    allExerciseIds: [
      'sit-ups',
      'upright-row',
      'right-arm-cross-body-stretch',
      'left-arm-cross-body-stretch',
      'right-glute-pigeon-pose-stretch',
      'left-glute-pigeon-pose-stretch',
    ],
  },
};

export default circuitSpeed;
