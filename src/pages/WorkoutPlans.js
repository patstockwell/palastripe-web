import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutTile from '../components/LayoutTile';
import BackSplash from '../components/BackSplash';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import { green, yellow } from '../helpers/constants';

const WorkoutTile = styled(LayoutTile)`
  box-shadow: 0px 4px 12px lightgrey;
  display: inline-block;
  width: 80%;
  scroll-snap-align: center;
  scroll-padding: 50%;
`;

const ScrollContainer = styled.div`
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  white-space: nowrap;
  overflow-y: hidden;
  overflow: scroll;
  -webkit-overflow-scrolling: touch; // enables momentum scolling
`;

const WorkoutPlans = ({ entities, location }) => {
  const {
    workoutPlans: { byId: byPlan, allIds: allPlans },
    workouts: { byId: byWorkout },
    exercises: { byId: byExercise },
  } = entities;

  const singleWorkoutPlan = allPlans[0];
  const dataForWorkouts = byPlan[singleWorkoutPlan].workouts
    .map(id => byWorkout[id].exercises)
    .map(exercises => exercises.map(id => byExercise[id]));
  console.log(dataForWorkouts);

  return (
    <BackSplash topLeft={green} bottomRight={yellow}>
      <Banner />
      <LayoutTile>
        something here
        <ScrollContainer>
          <WorkoutTile>
            inside
          </WorkoutTile>
          <WorkoutTile>
            inside
          </WorkoutTile>
          <WorkoutTile>
            inside
          </WorkoutTile>
        </ScrollContainer>
      </LayoutTile>
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

