import React  from 'react';
import { Switch, Route } from 'react-router-dom';
import { Transition } from 'react-spring/renderprops';
import Workouts from './Workouts';
import CurrentWorkout from '../CurrentWorkout';

export default () => (
  <Route
    render={({ location }) => {
      return (
        <Transition
          native
          items={location}
          keys={location.pathname}
          from={{ left: '100%' }}
          enter={{ left: '0' }}
          leave={{ left: '100%' }}
          config={{ tension: 410, friction: 40 }}
        >
          {(loc, state) => style => {
            return (
              <Switch location={state === 'update' ? location : loc}>
                <Route
                  path="/workouts/:id/"
                  render={({ match }) =>
                    <CurrentWorkout
                      match={match}
                      animationStyles={style}
                    />
                  }
                />
                <Route
                  path="/workouts/"
                  render={({ location }) => <Workouts location={location}/>}
                />
              </Switch>
            );
          }}
        </Transition>
      );
    }}
  />
);

