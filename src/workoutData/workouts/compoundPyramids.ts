import {
  WorkoutOutline, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/leg-press-dark.jpg';

const circuitSpeed: WorkoutOutline = {
  id: 'compound-pyramids',
  name: 'Compound Pyramids',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'a1bf1ecf-9132-4edb-b827-81ac8c01ad6f',
      name: 'Legs',
      exercises: [
        {
          id: 'leg_press',
          autoIncrement: 0,
          repsGoal: 12,
          repsAchieved: 12,
          weightInKilos: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'leg_press',
          autoIncrement: 0,
          repsGoal: 8,
          repsAchieved: 8,
          weightInKilos: 10,
          restPeriodInSeconds: 90,
        },
        {
          id: 'leg_press',
          autoIncrement: 0,
          repsGoal: 6,
          repsAchieved: 6,
          weightInKilos: 20,
          restPeriodInSeconds: 90,
        },
        {
          id: 'leg_press',
          autoIncrement: 0,
          repsGoal: 4,
          repsAchieved: 4,
          weightInKilos: 30,
          restPeriodInSeconds: 90,
        },
      ],
    },
    {
      id: 'bde934ab-0004-4c59-9eab-0737b884e6ed',
      name: 'Shoulders',
      exercises: [
        {
          id: 'overhead_press',
          autoIncrement: 0,
          repsGoal: 3,
          repsAchieved: 3,
          weightInKilos: 20,
          restPeriodInSeconds: 90,
        },
        {
          id: 'overhead_press',
          autoIncrement: 0,
          repsGoal: 3,
          repsAchieved: 3,
          weightInKilos: 20,
          restPeriodInSeconds: 90,
        },
        {
          id: 'overhead_press',
          autoIncrement: 0,
          repsGoal: 3,
          repsAchieved: 3,
          weightInKilos: 20,
          restPeriodInSeconds: 90,
        },
        {
          id: 'overhead_press',
          autoIncrement: 0,
          repsGoal: 3,
          repsAchieved: 3,
          weightInKilos: 20,
          restPeriodInSeconds: 90,
        },
      ],
    },
    {
      id: '1be96981-96ca-4c91-b696-ae624f7ec03a',
      name: 'Back',
      exercises: [
        {
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 8,
          repsAchieved: 8,
          weightInKilos: 20,
          restPeriodInSeconds: 90,
        },
        {
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 8,
          repsAchieved: 8,
          weightInKilos: 20,
          restPeriodInSeconds: 90,
        },
        {
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 8,
          repsAchieved: 8,
          weightInKilos: 20,
          restPeriodInSeconds: 90,
        },
        {
          id: 'upright_row',
          autoIncrement: 0,
          repsGoal: 8,
          repsAchieved: 8,
          weightInKilos: 20,
          restPeriodInSeconds: 90,
        },
      ],
    },
    {
      id: '7f409783-1e1e-44df-be20-b503cdfa665b',
      name: 'Chest',
      exercises: [
        {
          id: 'dumbbell_bench_press',
          autoIncrement: 0,
          repsGoal: 12,
          repsAchieved: 12,
          weightInKilos: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell_bench_press',
          autoIncrement: 0,
          repsGoal: 8,
          repsAchieved: 8,
          weightInKilos: 10,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell_bench_press',
          autoIncrement: 0,
          repsGoal: 6,
          repsAchieved: 6,
          weightInKilos: 12.5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dumbbell_bench_press',
          autoIncrement: 0,
          repsGoal: 3,
          repsAchieved: 3,
          weightInKilos: 15,
          restPeriodInSeconds: 90,
        },
      ],
    },
    {
      id: '2cec2d24-5936-46d4-b8ab-c5b63204bd34',
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
          id: 'kneeling_right_hip_flexor_stretch',
          timerInSeconds: 45,
        },
        {
          id: 'kneeling_left_hip_flexor_stretch',
          timerInSeconds: 45,
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

export default circuitSpeed;
