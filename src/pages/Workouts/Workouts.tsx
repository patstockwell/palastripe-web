import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navigation from '../../components/Navigation';
import Banner from '../../components/Banner';
import WorkoutTile from '../../components/WorkoutTile';
import { State } from '../../helpers/types';
import { tileMinHeight } from '../../helpers/constants';

const EmptySpace = styled.div`
  height: ${tileMinHeight}px;
`;

const Big = styled.div`
  height: 500px;
`;

const Workouts = ({ location, workouts}) => {
  const workoutTiles = workouts.map((w, i) =>
    <WorkoutTile key={w.id} workout={w} />
  );

  return (
    <Fragment>
      <Banner heading={'Workouts'}/>
      <Big />
      {workoutTiles}
      <Big />
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

