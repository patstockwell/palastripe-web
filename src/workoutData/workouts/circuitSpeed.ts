import {
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/active-body-crossfit-1533897.jpg';

const circuitSpeed: Workout = {
  id: 'circuit_speed',
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
          id: 'sit_ups',
          timerInSeconds: 60,
        }
      ],
    },
    {
      id: 'CIRCUIT_SPEED_WORKING_SETS',
      name: 'working sets',
      exercises: [
        {
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
        },
        {
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
        },
        {
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 10,
          weightInKilos: 30,
          restPeriodInSeconds: 60,
        },
        {
          id: 'upright_row',
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
      ],
    },
  ],
};

export default circuitSpeed;
