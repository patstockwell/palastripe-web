import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../../components/Navigation';
import PageHeading from '../../components/PageHeading';
import Workout from '../../components/Workout';
import { monday, tuesday } from '../../helpers/data';

const BottomScreenSpace = styled.div`
  height: 100px;
`

const Home = () => {
  const [workoutHistory] = useState([tuesday, tuesday, tuesday]);

  const workouts = workoutHistory.map((workout, i) =>
    <Workout key={i} workoutRoutine={workout} />
  );

  return (
    <div>
      <PageHeading>Home</PageHeading>
      <Link to="/home/active-workout">Start Workout</Link>
      <Workout workoutRoutine={monday} />
      {workouts}
      <BottomScreenSpace />
      <Navigation />
    </div>
  );
};

export default Home;

