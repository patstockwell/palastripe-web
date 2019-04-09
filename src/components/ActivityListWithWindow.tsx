import React, { Fragment } from 'react';
import styled from 'styled-components';
import ActivityTile from './ActivityTile';
import BannerForActiveWorkout from './BannerForActiveWorkout';
import WorkoutWindow from './WorkoutWindow';
import { combineDataForAllExercises } from '../helpers/functions';
import {
  bannerHeight,
  workoutWindowViewport,
  superLightGrey,
} from '../helpers/constants';
import { Activity, Entities, Exercises, Workout } from '../helpers/types';

const ActivityHeading = styled.div`
  height: 40px;
  background-color: ${superLightGrey};
  display: flex;
  align-items: center;
  position: sticky;
  top: calc(${bannerHeight}px + (${workoutWindowViewport}vh / 2));
  border-top: white 1px solid

  h2 {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
  }
`;

interface Props {
  entities: Entities;
  workout: Workout;
}

const ActivityListWithWindow = ({ entities, workout }: Props) => {
  const {
    exercises: {
      warmUp,
      workingSets,
      stretch,
    },
  }: Workout = combineDataForAllExercises(workout, entities.exercises);

  const warmUpTiles = warmUp.map((a: Activity, i) =>
    <ActivityTile key={i} activity={a} />
  );
  const exercisesTiles = workingSets.map((a: Activity, i) =>
    <ActivityTile key={i} activity={a} />
  );
  const stretchTiles = stretch.map((a: Activity, i) =>
    <ActivityTile key={i} activity={a} />
  );

  return (
    <Fragment>
      <BannerForActiveWorkout hash={workout.id}/>
      <WorkoutWindow title={ workout.name} imageUrl={workout.imageUrl} />
      <ActivityHeading>
        <h2>warm up</h2>
      </ActivityHeading>
      {warmUpTiles}
      <ActivityHeading>
        <h2>exercises</h2>
      </ActivityHeading>
      {exercisesTiles}
      <ActivityHeading>
        <h2>stretch</h2>
      </ActivityHeading>
      {stretchTiles}
    </Fragment>
  );
};

export default ActivityListWithWindow;
