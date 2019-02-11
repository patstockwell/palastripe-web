import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../../components/Banner';
import Navigation from '../../components/Navigation';
import WorkoutTile from '../../components/WorkoutTile';
import EmptyHistoryTile from '../../components/EmptyHistoryTile';
import { workoutPropType, exercisePropType } from '../../helpers/data';
import { tileMinHeight, gutterWidth } from '../../helpers/constants';

const BottomScreenSpace = styled.div`
  height: ${tileMinHeight}px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Hr = styled.hr`
  border: none;
  border-bottom: 1px solid white;
  margin: ${gutterWidth}px;
`;

const Home = ({ location, activeWorkout, workoutHistory }) => {

  const workouts = workoutHistory.map((workout, i) =>
    <WorkoutTile key={i} workoutRoutine={workout} />
  );

  return (
    <Fragment>
      <Banner />
      <StyledLink to="/home/active-workout">
        <WorkoutTile workoutRoutine={activeWorkout} />
      </StyledLink>
      <Hr />
      {workouts.length !== 0 ? workouts : <EmptyHistoryTile />}
      <BottomScreenSpace />
      <Navigation pathname={location.pathname} />
    </Fragment>
  );
};

Home.propTypes = {
  location: PropTypes.object,
  workoutHistory: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.object,
    exercises: PropTypes.arrayOf(PropTypes.shape(exercisePropType)),
  })),
  activeWorkout: PropTypes.shape(workoutPropType),
};

const mapStateToProps = state => ({
  workoutHistory: state.history,
  activeWorkout: state.activeWorkout,
});

export default connect(mapStateToProps)(Home);

