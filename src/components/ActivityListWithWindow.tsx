import React, { Fragment } from 'react';
import BannerForActiveWorkout from './BannerForActiveWorkout';
import WorkoutWindow from './WorkoutWindow';
import ActivityList from './ActivityList';
import {
  calculateWorkoutTime,
  formatTime,
} from '../helpers/functions';
import { Workout } from '../helpers/types';

interface Props {
  workout: Workout;
}

const ActivityListWithWindow = ({ workout }: Props) => {
  return (
    <Fragment>
      <BannerForActiveWorkout hash={workout.id}/>
      <WorkoutWindow
        title={workout.name}
        imageUrl={workout.imageUrl}
        time={formatTime(calculateWorkoutTime(workout))}
      />
      <ActivityList workout={workout} />
    </Fragment>
  );
};

export default ActivityListWithWindow;
