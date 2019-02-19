import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutTile from '../components/LayoutTile';
import WorkoutTile from '../components/WorkoutTile';
import BackSplash from '../components/BackSplash';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import { purple, blue } from '../helpers/constants';

const OpaqueTile = styled(LayoutTile)`
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
`;

const WorkoutPlans = ({ entities, location }) => {
  const {
    workoutPlans: { byId: byPlan, allIds: allPlans },
    workouts: { byId: byWorkout },
    exercises: { byId: byExercise },
  } = entities;

  console.log(entities);
  const singleWorkoutPlan = allPlans[0];
  const dataForWorkouts = byPlan[singleWorkoutPlan].workouts
    .map(id => byWorkout[id].exercises)
    .map(exercises => exercises.map(id => byExercise[id]));
  console.log(dataForWorkouts);

  return (
    <BackSplash topLeft={purple} bottomRight={blue}>
      <Banner />
      <OpaqueTile>
        something here
      </OpaqueTile>
      <Navigation pathname={location.pathname}/>
    </BackSplash>
  );
};

WorkoutPlans.propTypes = {
  location: PropTypes.object,
  entities: PropTypes.object,
};

const mapStateToProps = state => ({
  entities: state.entities,
});

export default connect(mapStateToProps)(WorkoutPlans);

