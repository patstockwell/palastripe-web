import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Transition } from 'react-spring';
import Workout from '../../components/Workout';
import PageHeading from '../../components/PageHeading';
import BackSplash from '../../components/BackSplash';
import ActiveWorkout from './../ActiveWorkout';
import { monday, tuesday } from '../../helpers/data';
import { pink, purple } from '../../helpers/constants';
import Navigation from '../../components/Navigation';

const Home = () => {
  const [workoutHistory] = useState([tuesday, tuesday, tuesday]);

  const workouts = workoutHistory.map(workout => <Workout workoutRoutine={workout} />)

  return (
    <BackSplash topLeft={pink} bottomRight={purple} >
      <Route
        render={({ location }) => {
          return (
            <Transition
              native
              items={location}
              keys={location.pathname.split('/')[2]}
              from={{ left: '100%' }}
              enter={{ left: '0' }}
              leave={{ left: '100%' }}
              config={{ tension: 410, friction: 40 }}
            >
              {(loc, state) => style => {
                return (
                <Switch location={state === 'update' ? location : loc}>
                  <Route
                    path="/home/active-workout/"
                    render={() => <ActiveWorkout animationStyles={style}/>}
                  />
                  <Route
                    path="/"
                    render={() => (
                      <div>
                        <PageHeading>Home</PageHeading>
                        <Link to="/home/active-workout">Start Workout</Link>
                        <Workout workoutRoutine={monday} />
                        {workouts}
                        <Navigation />
                      </div>
                    )}
                  />
                </Switch>
              )}}
            </Transition>
        )}}
      />
    </BackSplash>
  );
};

export default Home;

