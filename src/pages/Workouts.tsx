import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import AddWorkoutLink from '../components/AddWorkoutLink';
import Banner from '../components/Banner';
import WorkoutTile from '../components/WorkoutTile';
import {
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { tileMinHeight, bannerHeight } from '../helpers/constants';

const EmptySpace = styled.div`
  height: calc(100vh - ${tileMinHeight + (2 * bannerHeight)}px);
`;

interface Props {
  location: any;
  workouts: Workout[];
}

const Workouts = ({ location, workouts}: Props) => {
  const workoutTiles = workouts.map(w =>
    <WorkoutTile key={w.id} workout={w} />
  );

  return (
    <Fragment>
      <Banner heading={'Workouts'}/>
      <AddWorkoutLink />
      {workoutTiles}
      <EmptySpace />
      <Navigation pathname={location.pathname}/>
    </Fragment>
  );
};

const mapStateToProps = ({ entities: { workouts: { allIds, byId }}}: State) => {
  const workouts = allIds.map(id => byId[id]);
  return { workouts };
};

export default connect(mapStateToProps)(Workouts);
