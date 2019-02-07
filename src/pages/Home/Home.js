import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../../components/Navigation';
import PageHeading from '../../components/PageHeading';
import Workout from '../../components/Workout';
import { workoutPropType, exercisePropType } from '../../helpers/data';

const BottomScreenSpace = styled.div`
  height: 100px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Home = ({ activeWorkout, workoutHistory }) => {

  const workouts = workoutHistory.map((workout, i) =>
    <Workout key={i} workoutRoutine={workout} />
  );

  return (
    <Fragment>
      <PageHeading>Home</PageHeading>
      <StyledLink to="/home/active-workout">
        <Workout workoutRoutine={activeWorkout} />
      </StyledLink>
      {workouts}
      <BottomScreenSpace />
      <Navigation />
    </Fragment>
  );
};

Home.propTypes = {
  workoutHistory: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.shape(exercisePropType)),
  })),
  activeWorkout: PropTypes.shape(workoutPropType),
};

const mapStateToProps = state => ({
  workoutHistory: state.history,
  activeWorkout: state.activeWorkout,
});

export default connect(mapStateToProps)(Home);

