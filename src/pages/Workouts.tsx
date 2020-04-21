import React from 'react';
import { RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { WorkoutTile, CustomWorkoutTile } from '../components/WorkoutTile';
import Page from '../components/Page';
import { State } from '../helpers/types';
import { navBarHeight } from '../helpers/constants';
import { Workout } from '../reducers/workoutsReducer';

const EmptySpace = styled.div`
  height: ${2 * navBarHeight}px;
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

interface OwnProps {
  animationStyles: React.CSSProperties;
}

type Props = RouteProps & StateProps & OwnProps;

const Workouts: React.FC<Props> = ({
  location,
  workouts,
}) => {
  const workoutTiles = workouts.map((w: Workout) =>
    <WorkoutTile key={w.id} workout={w} />
  );

  return (
    <Page heading={'Workouts'} pathname={location.pathname} >
      <Ul>
        <CustomWorkoutTile />
        {workoutTiles}
      </Ul>
      <EmptySpace />
    </Page>
  );
};

interface StateProps {
  workouts: Workout[];
}

const mapStateToProps = ({ workouts }: State): StateProps => {
  const { allIds, byId } = workouts;
  const mappedWorkouts = allIds.map(id => byId[id]);
  return { workouts: mappedWorkouts };
};

export default connect<StateProps, void, void>(mapStateToProps)(Workouts);
