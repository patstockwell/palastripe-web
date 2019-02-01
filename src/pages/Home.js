import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Workout from '../components/Workout';

const Home = () => {
  const monday = {
    workoutName: 'Legs Burn',
    data: [
      {
        name: 'deadlift',
        weightInKilos: 80,
        sets: [7, 7, 7, 7],
      },
      {
        name: 'squat',
        weightInKilos: 50,
        sets: [7, 7, 7, 7],
      },
    ],
  };

  const tuesday = {
    workoutName: 'Arms Routine',
    date: new Date(1543933984145),
    data: [
      {
        name: 'chinups',
        weightInKilos: 0,
        sets: [5, 5, 5, 5],
      },
      {
        name: 'bicep curl',
        weightInKilos: 12,
        sets: [8, 8, 8, 8],
      },
    ],
  };

  return (
    <div>
      <h2>Home</h2>
      <Link to="active-workout-overview">Start Workout</Link>
      <Workout workoutRoutine={monday} />
      <Workout workoutRoutine={tuesday} />
      <Navigation />
    </div>
  );
};

export default Home;

