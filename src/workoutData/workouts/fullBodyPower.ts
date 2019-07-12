import {
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/active-adult-aerobics-206573.jpg';

const fullBodyPower: Workout = {
  id: 'full_body_power',
  urlPathName: 'full-body-power',
  name: 'Full Body Power',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'warm_up',
      name: 'Warm Up',
      exercises: [
        {
          id: 'stationary_bike',
          timerInSeconds: 300,
          restPeriodInSeconds: 60,
        },
        {
          id: 'lunges',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
      ],
    },
    {
      id: 'exercises',
      name: 'Exercises',
      exercises: [
        // 3 x 5 back_squat 40kg
        {
          id: 'back_squat',
          weightInKilos: 40,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'back_squat',
          weightInKilos: 40,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'back_squat',
          weightInKilos: 40,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },
        // 3 x 5 deadlifts 80kg
        {
          id: 'dead_lift',
          weightInKilos: 80,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dead_lift',
          weightInKilos: 80,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'dead_lift',
          weightInKilos: 80,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        // 3 x 5 chin ups
        {
          id: 'chin_up',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
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
          id: 'chin_up',
          weightInKilos: 0,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        // 3 x 5 overhead press 30kg
        {
          id: 'overhead_press',
          weightInKilos: 30,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'overhead_press',
          weightInKilos: 30,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'overhead_press',
          weightInKilos: 30,
          repsGoal: 5,
          repsAchieved: 5,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },
        // 3  x 20 push ups
        {
          id: 'push_ups',
          weightInKilos: 0,
          repsGoal: 20,
          repsAchieved: 20,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'push_ups',
          weightInKilos: 0,
          repsGoal: 20,
          repsAchieved: 20,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'push_ups',
          weightInKilos: 0,
          repsGoal: 20,
          repsAchieved: 20,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        // 3 x 12 lying ring rows
        {
          id: 'ring_rows',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'ring_rows',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'ring_rows',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
      ],
    },
  ],
};

export default fullBodyPower;
