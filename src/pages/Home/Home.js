import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../../components/Banner';
import Navigation from '../../components/Navigation';
import PageHeading from '../../components/PageHeading';
import Workout from '../../components/Workout';
import EmptyHistoryTile from '../../components/EmptyHistoryTile';
import { workoutPropType, exercisePropType } from '../../helpers/data';
import { workoutTileMinHeight, gutterWidth } from '../../helpers/constants';

const BottomScreenSpace = styled.div`
  height: ${workoutTileMinHeight}px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Hr = styled.hr`
  border: none;
  border-bottom: 1px solid white;
  margin: ${gutterWidth}px;
`;

const Home = ({ activeWorkout, workoutHistory }) => {

  const workouts = workoutHistory.map((workout, i) =>
    <Workout key={i} workoutRoutine={workout} />
  );

  return (
    <Fragment>
      <Banner />
      <PageHeading>Home</PageHeading>
      <StyledLink to="/home/active-workout">
        <Workout workoutRoutine={activeWorkout} />
      </StyledLink>
      <Hr />
      {workouts.length !== 0 ? workouts : <EmptyHistoryTile />}
      <BottomScreenSpace />
      <Navigation />
    </Fragment>
  );
};

Home.propTypes = {
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

