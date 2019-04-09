import React, { Fragment } from 'react';
import styled from 'styled-components';
import ActivityTile from './ActivityTile';
import BannerForActiveWorkout from './BannerForActiveWorkout';
import { combineDataForAllExercises } from '../helpers/functions';
import { bannerHeight, superLightGrey } from '../helpers/constants';
import { Activity, Entities, Exercises, Workout } from '../helpers/types';

const Window = styled.div`
  height: 300px;
  position: sticky;
  top: ${bannerHeight}px;
  background-color: black;
  color: white;

  // put the image in an 'after' pseudo element. Set it behind the original
  // element which has opacity giving it the dark filter look
  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ imageUrl }) => imageUrl});
    background-size: cover;
    opacity: 0.5;
    z-index: -1;
  }
`;

const ActivityHeading = styled.div`
  height: 40px;
  background-color: ${superLightGrey};
  display: flex;
  align-items: center;
  position: sticky;
  top: calc(${bannerHeight}px + 300px);
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
      <Window imageUrl={workout.imageUrl}>
        <h1>workout</h1>
      </Window>
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
