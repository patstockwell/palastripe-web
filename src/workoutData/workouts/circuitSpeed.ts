import {v4 as uuidv4} from 'uuid';
import {Workout} from '../../reducers/workoutsReducer';
import {WORKOUT_VERSION} from '../../helpers/constants';
import Image from '../../assets/images/active-body-crossfit-1533897.jpg';

export const circuitSpeed: Workout = {
  id: 'circuit-speed',
  name: 'Circuit Speed',
  description: 'Get your heartrate up with this cardio-based, high-intensity circuit workout.',
  imageUrl: Image,
  version: WORKOUT_VERSION,
  exerciseGroups: [
    {
      id: '37263956-3c6b-4fad-a1db-d561331f1679',
      name: 'warm up',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'star_jumps',
          timerInSeconds: 60,
          name: 'Star Jumps',
        },
      ],
    },
    {
      id: 'f93991d8-ce32-4ded-979d-5927bf819642',
      name: 'Circuit 1',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'sit_ups',
          name: 'Sit Ups',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'scissor_jumps',
          name: 'Scissor Jump',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_overhead_press',
          name: 'Dumbbell Overhead Press',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'sit_ups',
          name: 'Sit Ups',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'scissor_jumps',
          name: 'Scissor Jump',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_overhead_press',
          name: 'Dumbbell Overhead Press',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'sit_ups',
          name: 'Sit Ups',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'scissor_jumps',
          name: 'Scissor Jump',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'dumbbell_overhead_press',
          name: 'Dumbbell Overhead Press',
          timerInSeconds: 60,
        },
      ],
    },
    {
      id: 'a9a014eb-920d-4e5a-929f-275474eb2327',
      name: 'Circuit 2',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'push_ups',
          name: 'Push Up',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'toe_touches',
          name: 'Toe Touches',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'bulgarian_split_squat',
          name: 'Bulgarian Split Squat',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'push_ups',
          name: 'Push Up',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'toe_touches',
          name: 'Toe Touches',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'bulgarian_split_squat',
          name: 'Bulgarian Split Squat',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'push_ups',
          name: 'Push Up',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'toe_touches',
          name: 'Toe Touches',
          timerInSeconds: 45,
        },
        {
          id: uuidv4(),
          exerciseId: 'bulgarian_split_squat',
          name: 'Bulgarian Split Squat',
          timerInSeconds: 60,
        },
      ],
    },
    {
      id: '96e7b9a9-b417-4405-87ea-63b876e923f5',
      name: 'stretch',
      exercises: [
        {
          id: uuidv4(),
          exerciseId: 'right_arm_cross_body_stretch',
          name: 'Right Arm Cross Body',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'left_arm_cross_body_stretch',
          name: 'Left Arm Cross Body',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 60,
        },
        {
          id: uuidv4(),
          exerciseId: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 60,
        },
      ],
    },
  ],
};
