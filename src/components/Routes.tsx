import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTransition } from 'react-spring';
import { useLocation, Route, Switch } from 'react-router-dom';
import Workouts from '../pages/Workouts';
import ActiveWorkout from '../pages/ActiveWorkout';
import Activity from '../pages/Activity';
import EditWorkout from '../pages/EditWorkout';
import FourZeroFour from '../pages/FourZeroFour';
import Profile from '../pages/Profile';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  RouteState, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { SET_FIRST_RENDER_FLAG } from '../helpers/constants';

type Props = DispatchProps & StateProps;

const Routes: React.FC<Props> = ({ isFirstRender, removeIsFirstRender }) => {
  const [ activeWorkoutPageAtRest, setActiveWorkoutPageAtRest ] = useState(false);
  const [ profilePageAtRest, setProfilePageAtRest ] = useState(false);
  const location = useLocation();
  const {
    // set default value in case none is passed
    state = { immediate: true, backPath: '/workouts/' },
  }: { state: RouteState } = location;
  const { immediate, backPath } = state;

  const transitions = useTransition(location, (loc: any) => loc.key, {
    immediate,
    from: { opacity: 0, left: '100%', top: '100vh', position: 'fixed' },
    enter: { opacity: 1, left: '0%', top: '0vh' },
    leave: { opacity: 0, left: '100%', top: '100vh' },
    config: { tension: 410, friction: 40 },
    onDestroyed: () => {
      // as soon as we complete our first transition, it is no longer the first
      // render. Set the flag to false.
      // We use this value to determine page styling (position for animation)
      if (isFirstRender) {
        removeIsFirstRender();
      }
      const { pathname: path } = location;
      setActiveWorkoutPageAtRest(path !== '/workouts/' && /\/workouts*/.test(path));
      setProfilePageAtRest(path === '/profile/');
    },
  });

  return (
    <React.Fragment>
      {transitions.map(({ item, props, key }) => (
        <Switch key={key} location={item}>
          <Route path="/" exact component={Workouts} />
          <Route path="/workouts/" exact component={Workouts} />
          <Route path="/activity/" component={Activity} />
          <Route path="/profile/" exact render={() =>
            <Profile
              backPath={backPath}
              atRest={profilePageAtRest || isFirstRender}
              animationStyles={props} />} />
          <Route path="/edit-workout/" render={() =>
            <EditWorkout animationStyles={props} />} />
          <Route path="/workouts/:id/" render={({ match }) =>
            <ActiveWorkout
              atRest={activeWorkoutPageAtRest}
              animationStyles={props}
              match={match} />} />
          <Route component={FourZeroFour} />
        </Switch>
      ))}
    </React.Fragment>
  );
};

interface StateProps {
  isFirstRender: boolean;
}

const mapStateToProps = (state: State) => ({
  isFirstRender: state.isFirstRender,
});

interface DispatchProps {
  removeIsFirstRender: () => ReduxAction<undefined>;
}

const mapDispatchToProps: DispatchProps = {
  removeIsFirstRender: () => ({
    type: SET_FIRST_RENDER_FLAG,
  }),
};

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
