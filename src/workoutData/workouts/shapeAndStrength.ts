import {v4 as uuidv4} from 'uuid';
import {Workout} from '../../reducers/workoutsReducer';
import {WORKOUT_VERSION} from '../../helpers/constants';
import Image from '../../assets/images/overhead-press.jpg';

export const shapeAndStrength: Workout = {
  id: 'shape-and-strength',
  name: 'Shape And Strength',
  description: 'Combining overhead barbell work and hanging leg raises, this workout will get your heartrate up while helping build strength.',
  imageUrl: Image,
  version: WORKOUT_VERSION,
  exerciseGroups: [
    {
      id: 'd55f682b-6540-448b-b56b-b4a576f5a100',
      name: 'Warm Up',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'toe_touches',
          name: 'Toe Touches',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: uuidv4(),
          exerciseId: 'lunges',
          name: 'Lunges',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
      ],
    },
    {
      id: '53f0a8db-b433-4536-ad77-36731d6377ed',
      name: 'Press Superset 1',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: uuidv4(),
          exerciseId: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },

        {
          id: uuidv4(),
          exerciseId: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },

        {
          id: uuidv4(),
          exerciseId: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: uuidv4(),
          exerciseId: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },
      ],
    },

    {
      name: 'Press Superset 2',
      id: '59c6029f-1585-4f47-bd0d-6742352ab999',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
      ],
    },
    {
      name: 'Stretch',
      id: 'fade0a2a-831b-4576-903e-2af55d34df8c',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'right_arm_cross_body_stretch',
          name: 'Right Arm Cross Body',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'left_arm_cross_body_stretch',
          name: 'Left Arm Cross Body',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
        {
          id: uuidv4(),
          exerciseId: 'overhead_band_chest_stretch',
          name: 'Overhead Band Chest Stretch',
          timerInSeconds: 60,
          restPeriodInSeconds: 0,
        },
      ],
    },
  ],
};
