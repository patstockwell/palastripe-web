import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Transition } from 'react-spring';
import Workout from '../components/Workout';
import PageHeading from '../components/PageHeading';
import BackSplash from '../components/BackSplash';
import ActiveWorkoutOverview from './ActiveWorkoutOverview';
import { monday, tuesday } from '../helpers/data';
import { pink, purple } from '../helpers/constants';

const Home = () => {
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
            >
              {(loc, state) => style => {
                return (
                <Switch location={state === 'update' ? location : loc}>
                  <Route
                    path="/home/active-workout-overview/"
                    render={() => <ActiveWorkoutOverview animationStyles={style}/>}
                  />
                  <Route
                    path="/home"
                    render={() => (
                      <div>
                        <PageHeading>Home</PageHeading>
                        <Link to="/home/active-workout-overview">Start Workout</Link>
                        <Workout workoutRoutine={monday} />
                        <Workout workoutRoutine={tuesday} />
                        <Workout workoutRoutine={tuesday} />
                        <Workout workoutRoutine={tuesday} />
                        <Workout workoutRoutine={tuesday} />
                        <Workout workoutRoutine={tuesday} />
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

