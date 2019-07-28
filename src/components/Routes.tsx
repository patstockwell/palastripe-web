import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import { Route, Switch } from 'react-router-dom';
import Workouts from '../pages/Workouts';
import ActiveWorkout from '../pages/ActiveWorkout';
import Activity from '../pages/Activity';
import EditWorkout from '../pages/EditWorkout';
import FourZeroFour from '../pages/FourZeroFour';
import { useRouter } from '../helpers/functions';

const Routes = () => {
  const [ destroyed, setDestroyed ] = useState(false);
  const { location } = useRouter();
  const { state = { immediate: true } }: {
    state: {
      immediate: boolean,
    },
  } = location;

  const transitions = useTransition(location, (loc: any) => loc.key, {
    immediate: state.immediate,
    from: { opacity: 0, left: '100%', top: '100vh', position: 'fixed' },
    enter: { opacity: 1, left: '0%', top: '0vh' },
    leave: { opacity: 0, left: '100%', top: '100vh' },
    config: { tension: 410, friction: 40 },
    onDestroyed: () => {
      if (location.pathname !== '/workouts/'
        && /\/workouts*/.test(location.pathname)) {
        setDestroyed(true);
      } else {
        setDestroyed(false);
      }
    },
  });

  return transitions.map(({ item, props, key }) => (
    <Switch key={key} location={item}>
      <Route path="/" exact component={Workouts} />
      <Route path="/workouts/" exact component={Workouts} />
      <Route path="/activity/" component={Activity} />
      <Route path="/edit-workout/" render={() =>
        <EditWorkout animationStyles={props} />} />
      <Route path="/workouts/:id/" render={({ match }) =>
        <ActiveWorkout destroyed={destroyed} animationStyles={props} match={match} />} />
      <Route component={FourZeroFour} />
    </Switch>
  ));
};

export default Routes;
