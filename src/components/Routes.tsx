import React from 'react';
import { useTransition } from 'react-spring';
import { Route, Switch } from 'react-router-dom';
import Workouts from '../pages/Workouts';
import ViewWorkout from '../pages/ViewWorkout';
import ActiveWorkout from '../pages/ActiveWorkout';
import Home from '../pages/Home';
import Me from '../pages/Me';
import EditWorkout from '../pages/EditWorkout';
import FourZeroFour from '../pages/FourZeroFour';
import { useRouter } from '../helpers/functions';

const Routes = () => {
  const { location } = useRouter();
  const { state = { immediate: true } } = location;

  const anyUseTransition = useTransition as any;

  const transitions = anyUseTransition(location, location => location.key, {
    immediate: state.immediate,
    from: { left: '100%', top: '100vh', position: 'fixed' },
    enter: [{ left: '0%', top: '0vh' }, { position: 'relative' }],
    leave: [{ position : 'fixed' }, { left: '100%', top: '100vh' }],
    config: { tension: 410, friction: 40 },
  });

  return transitions.map(({ item, props, key }) => (
    <Switch key={key} location={item}>
      <Route path="/" exact component={Home} />
      <Route path="/home/" component={Home} />
      <Route path="/me/" component={Me} />
      <Route path="/workouts/" exact component={Workouts} />
      <Route path="/edit-workout/" render={() =>
        <EditWorkout animationStyles={props} />} />
      <Route path="/workouts/:id/" render={({ match }) =>
        <ViewWorkout match={match} animationStyles={props} />} />
      <Route path="/active-workout/" render={() =>
        <ActiveWorkout pathname={location.pathname} animationStyles={props} />} />
      <Route component={FourZeroFour} />
    </Switch>
  ));
};

export default Routes;
