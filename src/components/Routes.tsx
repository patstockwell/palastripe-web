import React from 'react';
import { useTransition } from 'react-spring';
import { useHistory, useLocation, Route, Switch } from 'react-router-dom';
import Workouts from '../pages/Workouts';
import ActiveWorkout from '../pages/ActiveWorkout';
import Activity from '../pages/Activity';
import EditWorkout from '../pages/EditWorkout';
import FourZeroFour from '../pages/FourZeroFour';
import Profile from '../pages/Profile';
import ProfileName from '../pages/ProfileName';
import SettingAudio from '../pages/SettingAudio';
import SettingUnitOfMeasurement from '../pages/SettingUnitOfMeasurement';
import {
  RouteState, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const Routes: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();

  const {
    // set default value in case none is passed
    state = { immediate: true },
  }: { state: RouteState } = location;
  const immediate = state.immediate
    || history.action === 'POP'; // way to determine if 'back' was used in the browser

  const transitions = useTransition(location, (loc: any) => loc.key, {
    immediate,
    from: { opacity: 0, right: '-50%', left: '100%', top: '100vh', position: 'fixed' },
    enter: { opacity: 1, right: '0%', left: '0%', top: '0vh' },
    leave: { opacity: 0, right: '-50%', left: '100%', top: '100vh' },
    config: { tension: 410, friction: 40 },
  });

  return (
    <React.Fragment>
      {transitions.map(({ item, props, key }) => (
        <Switch key={key} location={item}>
          <Route path="/" exact component={Workouts} />
          <Route path="/workouts/" exact render={() =>
            <Workouts animationStyles={props} location={location} />} />
          <Route path="/activity/" component={Activity} />
          <Route path="/profile/" exact component={Profile} />
          <Route path="/profile/name" render={() =>
            <ProfileName animationStyles={props} />} />
          <Route path="/profile/audio" render={() =>
            <SettingAudio animationStyles={props} />} />
          <Route path="/profile/unit-of-measurement" render={() =>
            <SettingUnitOfMeasurement animationStyles={props} />} />
          <Route path="/edit-workout/" render={() =>
            <EditWorkout animationStyles={props} />} />
          <Route path="/workouts/:id/" render={({ match }) =>
            <ActiveWorkout
              animationStyles={props}
              match={match} />} />
          <Route component={FourZeroFour} />
        </Switch>
      ))}
    </React.Fragment>
  );
};

export default Routes;
