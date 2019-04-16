import React, { Fragment } from 'react';
import BannerForActiveWorkout from './BannerForActiveWorkout';
import WorkoutWindow from './WorkoutWindow';
import ActivityList from './ActivityList';
import {
  calculateWorkoutTime,
  formatMinutes,
} from '../helpers/functions';
import {
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

interface Props {
  workout: Workout;
}

const ActivityListWithWindow = ({ workout }: Props) => {
  return (
    <Fragment>
      <BannerForActiveWorkout />
      <WorkoutWindow
        title={workout.name}
        imageUrl={workout.imageUrl}
        time={formatMinutes(calculateWorkoutTime(workout))}
      />
      <ActivityList workout={workout} />
    </Fragment>
  );
};

export default ActivityListWithWindow;
