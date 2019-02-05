import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../../components/Navigation';
import PageHeading from '../../components/PageHeading';
import Workout from '../../components/Workout';
import { monday } from '../../helpers/data';

const BottomScreenSpace = styled.div`
  height: 100px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Home = ({ workoutHistory }) => {

  const workouts = workoutHistory.map((workout, i) =>
    <Workout key={i} workoutRoutine={workout} />
  );

  return (
    <div>
      <PageHeading>Home</PageHeading>
      <StyledLink to="/home/active-workout">
        <Workout workoutRoutine={monday} />
      </StyledLink>
      {workouts}
      <BottomScreenSpace />
      <Navigation />
    </div>
  );
};

Home.propTypes = {
  workoutHistory: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      weightInKilos: PropTypes.number,
      sets: PropTypes.arrayOf(PropTypes.number),
    })),
  })),
};

const mapStateToProps = state => ({
  workoutHistory: state.history,
});

export default connect(mapStateToProps)(Home);

