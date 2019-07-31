import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTransition } from 'react-spring';
import { Route, Switch } from 'react-router-dom';
import Workouts from '../pages/Workouts';
import ActiveWorkout from '../pages/ActiveWorkout';
import Activity from '../pages/Activity';
import EditWorkout from '../pages/EditWorkout';
import FourZeroFour from '../pages/FourZeroFour';
import { useRouter } from '../helpers/functions';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { SET_FIRST_RENDER_FLAG } from '../helpers/constants';

type Props = DispatchProps & StateProps;

const Routes: React.FC<Props> = ({ isFirstRender, setIsFirstRender }) => {
  const [ destroyed, setDestroyed ] = useState(false);
  const [ transitionsHaveStarted, setTransitionsHaveStarted ] = useState(false);
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
    onStart: () => !transitionsHaveStarted && setTransitionsHaveStarted(true),
    onDestroyed: () => {
      console.log(isFirstRender, transitionsHaveStarted);
      // as soon as we complete our first transition, it is no longer the first
      // render. Set the flag to false.
      // We use this value to determine page styling (position for animation)
      if (isFirstRender) {
        setIsFirstRender();
      }

      if (location.pathname !== '/workouts/'
        && /\/workouts*/.test(location.pathname)) {
        setDestroyed(true);
      } else {
        setDestroyed(false);
      }
    },
  });

  return (
    <React.Fragment>
      {transitions.map(({ item, props, key }) => (
        <Switch key={key} location={item}>
          <Route path="/" exact component={Workouts} />
          <Route path="/workouts/" exact component={Workouts} />
          <Route path="/activity/" component={Activity} />
          <Route path="/edit-workout/" render={() =>
            <EditWorkout animationStyles={props} />} />
          <Route path="/workouts/:id/" render={({ match }) =>
            <ActiveWorkout
              transitionsHaveStarted={transitionsHaveStarted}
              destroyed={destroyed}
              animationStyles={props}
              match={match}
            />}
          />
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
  setIsFirstRender: () => ReduxAction<undefined>;
}

const mapDispatchToProps: DispatchProps = {
  setIsFirstRender: () => ({
    type: SET_FIRST_RENDER_FLAG,
  }),
};

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
