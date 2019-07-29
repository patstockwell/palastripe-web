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
  const { state = { immediate: true } } = location;

  const transitions = useTransition(location,
    (loc: any) => loc.key, {
      immediate: state.immediate,
      from: { left: '100%', top: '100vh', position: 'fixed' },
      enter: { left: '0%', top: '0vh' },
      leave: { left: '100%', top: '100vh' },
      config: { tension: 410, friction: 40 },
      onDestroyed: () => {
        if (location.pathname !== '/workouts/'
          && /\/workouts*/.test(location.pathname)) {
          setDestroyed(true);
        } else {
          setDestroyed(false);
        }
      },
    }
  );

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
