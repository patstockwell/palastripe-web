import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navigation from '../../components/Navigation';
import Banner from '../../components/Banner';
import WorkoutTile from '../../components/WorkoutTile';
import { State } from '../../helpers/types';

const Big = styled.div`
  height: 2000px;
`;

const Workouts = ({ location, workouts}) => {
  const workoutTiles = workouts.map((w, i) =>
    <WorkoutTile i={i} key={w.id} workout={w} />
  );

  return (
    <Big>
      <Banner heading={'Workouts'}/>
      {workoutTiles}
      {workoutTiles}
      {workoutTiles}
      {workoutTiles}
      {workoutTiles}
      {workoutTiles}
      {workoutTiles}
      {workoutTiles}
      <Navigation pathname={location.pathname}/>
    </Big>
  );
};

const mapStateToProps = ({ entities: { workouts: { allIds, byId }}}: State) => {
  const workouts = allIds.map(id => byId[id]);
  return { workouts };
};

export default connect(mapStateToProps)(Workouts);

