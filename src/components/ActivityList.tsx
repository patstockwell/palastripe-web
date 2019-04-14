import React  from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ActivityTile from './ActivityTile';
import { combineDataForAllExercises } from '../helpers/functions';
import {
  activityHeadingHeight,
  bannerHeight,
  superLightGrey,
  tileMinHeight,
} from '../helpers/constants';
import {
  Activity, // eslint-disable-line no-unused-vars
  Entities, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout,  // eslint-disable-line no-unused-vars
} from '../helpers/types';

interface Props {
  workout: Workout;
  entities: Entities;
}

const ActivityHeading = styled.li`
  height: ${activityHeadingHeight}px;
  background-color: ${superLightGrey};
  display: flex;
  align-items: center;
  position: sticky;
  top: ${bannerHeight}px;

  h2 {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
    margin: 0 12px;
  }
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  list-style: none;
`;

const EmptySpace = styled.div`
  height: calc(100vh - ${
  activityHeadingHeight + bannerHeight + tileMinHeight}px);
`;

const ActivityList = ({ workout, entities}) => {
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
    <Ul>
      <Ul>
        <ActivityHeading>
          <h2>warm up</h2>
        </ActivityHeading>
        {warmUpTiles}
      </Ul>
      <Ul>
        <ActivityHeading>
          <h2>exercises</h2>
        </ActivityHeading>
        {exercisesTiles}
      </Ul>
      <Ul>
        <ActivityHeading>
          <h2>stretch</h2>
        </ActivityHeading>
        {stretchTiles}
        <EmptySpace />
      </Ul>
    </Ul>
  );
};

const mapStateToProps = (state: State) => ({
  entities: state.entities,
});

export default connect(mapStateToProps)(ActivityList);
