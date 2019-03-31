import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../../components/Banner';
import Navigation from '../../components/Navigation';
import UpNextTile from '../../components/UpNextTile';
import HistoryTile from '../../components/HistoryTile';
import EmptyTile from '../../components/EmptyTile';
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
    <HistoryTile key={i} workout={workout} />
  );

  return (
    <Fragment>
      <Banner heading={'Home'}/>
      <StyledLink to="/home/active-workout">
        <UpNextTile workout={activeWorkout} />
      </StyledLink>
      <Hr />
      {workouts.length !== 0 ? workouts :
        <EmptyTile>
          Your workout history will appear here
        </EmptyTile>
      }
      <BottomScreenSpace />
      <Navigation pathname={location.pathname} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  workoutHistory: state.history,
  activeWorkout: state.activeWorkout,
});

export default connect(mapStateToProps)(Home);

