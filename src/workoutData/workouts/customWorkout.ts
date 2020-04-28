import { VERSION_ONE } from '../../helpers/constants';
import { Workout } from '../../reducers/workoutsReducer';
import Image from '../../assets/images/custom-workout-image.jpg';

export const customWorkoutId = 'custom-workout';

export const customWorkout: Workout = {
  id: customWorkoutId,
  name: 'Custom Workout',
  imageUrl: Image,
  exerciseGroups: [{
    name: 'Custom Workout',
    id: 'first-group-custom-workout',
    exercises: [],
  }],
  startTime: Date.now(),
  version: VERSION_ONE,
};