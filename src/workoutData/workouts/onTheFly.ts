import {WORKOUT_VERSION} from '../../helpers/constants';
import {Workout} from '../../reducers/workoutsReducer';
import Image from '../../assets/images/custom-workout-image.jpg';

export const legacyOnTheFlyWorkoutId = 'custom-workout';
export const onTheFlyWorkoutId = 'on-the-fly';
export const onTheFlyWorkoutGroupId = 'on-the-fly-workout-first-group';

export const onTheFly: Workout = {
  id: onTheFlyWorkoutId,
  description: 'Nothing planned? Start here with a blank workout and track your exercises as you do them.',
  name: 'On The Fly',
  imageUrl: Image,
  exerciseGroups: [{
    name: 'On The Fly',
    id: onTheFlyWorkoutGroupId,
    exercises: [],
  }],
  version: WORKOUT_VERSION,
};
