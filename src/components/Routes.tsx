import React from 'react';
import { useTransition } from 'react-spring';
import { Route, Switch } from 'react-router-dom';
import Workouts from '../pages/Workouts';
import ActiveWorkout from '../pages/ActiveWorkout';
import Activity from '../pages/Activity';
import Me from '../pages/Me';
import EditWorkout from '../pages/EditWorkout';
import FourZeroFour from '../pages/FourZeroFour';
import { useRouter } from '../helpers/functions';

const Routes = () => {
  const { location } = useRouter();
  const { state = { immediate: true } } = location;

  const anyUseTransition = useTransition as any;

  const transitions = anyUseTransition(location,
    (location: any) => location.key, {
      immediate: state.immediate,
      from: { left: '100%', top: '100vh', position: 'fixed' },
      enter: [{ left: '0%', top: '0vh' }, { position: 'relative' }],
      leave: [{ position : 'fixed' }, { left: '100%', top: '100vh' }],
      config: { tension: 410, friction: 40 },
    }
  );

  return transitions.map(({ item, props, key }) => (
    <Switch key={key} location={item}>
      <Route path="/" exact component={Workouts} />
      <Route path="/workouts/" exact component={Workouts} />
      <Route path="/activity/" component={Activity} />
      <Route path="/me/" component={Me} />
      <Route path="/edit-workout/" render={() =>
        <EditWorkout animationStyles={props} />} />
      <Route path="/workouts/:id/" render={({ match }) =>
        <ActiveWorkout animationStyles={props} match={match} />} />
      <Route component={FourZeroFour} />
    </Switch>
  ));
};

export default Routes;
