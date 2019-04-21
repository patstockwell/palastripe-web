import React from 'react';
import { useTransition } from 'react-spring';
import { Route, Switch } from 'react-router-dom';
import Workouts from '../pages/Workouts/Workouts';
import CurrentWorkout from '../pages/CurrentWorkout';
import ActiveWorkout from '../pages/ActiveWorkout';
import Home from '../pages/Home';
import Me from '../pages/Me';
import FourZeroFour from '../pages/FourZeroFour';
import { useRouter } from '../helpers/functions';

const Routes = () => {
  const { location } = useRouter();
  const { state = { immediate: true } } = location;
  console.log(location);

  const transitions = useTransition(location, location => location.key, {
    immediate: state.immediate,
    from: { opacity: 0, left: '100%' },
    enter: { opacity: 1, left: '0%' },
    leave: { opacity: 0, left: '100%' },
    config: { tension: 410, friction: 40 },
  });

  return transitions.map(({ item, props, key }) => (
    <Switch key={key} location={item}>
      <Route path="/" exact component={Home} />
      <Route path="/home/" component={Home} />
      <Route path="/me/" render={({ location }) =>
        <Me location={location} animationStyles={props} />}
      />
      <Route path="/workouts/" exact component={Workouts} />
      <Route path="/workouts/:id/" render={({ match }) =>
        <CurrentWorkout match={match} animationStyles={props} />}
      />
      <Route path="/active-workout/" render={() =>
        <ActiveWorkout animationStyles={props} />} />
      <Route component={FourZeroFour} />
    </Switch>
  ));
};

export default Routes;
