import React from 'react';
import {
  RouteProps, // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import WorkoutTile from '../components/WorkoutTile';
import Page from '../components/Page';
import {
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  navBarHeight,
} from '../helpers/constants';

const EmptySpace = styled.div`
  height: ${2 * navBarHeight}px;
`;

type Props = RouteProps & StateProps;

const Workouts: React.FC<Props> = ({
  location,
  workouts,
}) => {
  const workoutTiles = workouts.map((w: Workout) =>
    <WorkoutTile key={w.id} workout={w} />
  );

  return (
    <Page heading={'Workouts'} pathname={location.pathname} >
      {workoutTiles}
      <EmptySpace />
    </Page>
  );
};

interface StateProps {
  workouts: Workout[];
}

const mapStateToProps = ({
  entities: {
    workouts: { allIds, byId },
  },
}: State): StateProps => {
  const workouts = allIds.map(id => byId[id]);
  return { workouts };
};

export default connect<StateProps, void, void>(mapStateToProps)(Workouts);
