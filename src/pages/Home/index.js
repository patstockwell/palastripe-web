import React  from 'react';
import { Switch, Route } from 'react-router-dom';
import { Transition } from 'react-spring/renderprops';
import Home from './Home';
import BackSplash from '../../components/BackSplash';
import ActiveWorkout from './../ActiveWorkout';
import { pink, purple } from '../../helpers/constants';

export default () => (
  <BackSplash deg={285} topLeft={pink} bottomRight={purple} >
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
                    path="/home/active-workout/"
                    render={() => <ActiveWorkout animationStyles={style}/>}
                  />
                  <Route
                    path="/"
                    render={({ location }) => <Home location={location}/>}
                  />
                </Switch>
              );
            }}
          </Transition>
        );
      }}
    />
  </BackSplash>
);

