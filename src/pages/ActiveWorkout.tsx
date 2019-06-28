import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { animated } from 'react-spring';
import AlertConfirm, { LinkButton, Button } from '../components/AlertConfirm';
import ActivityList from '../components/ActivityList/ActivityList';
import {
  Entities, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { FINISH_WORKOUT, purple } from '../helpers/constants';

export const AnimatedSlidingPage = styled(animated.div)`
  z-index: 10;
  top: 0;
  width: 100%;
  -webkit-overflow-scrolling: touch; // enables momentum scolling
`;

const GlobalStyle = createGlobalStyle`
  body {
    // used for when the modal is displayed
    // to avoid background scrolling
    overflow: ${({ hidden }) => hidden ? 'hidden' : 'visible'};
  }
`;

interface OwnProps {
  animationStyles: any;
  workout: Workout;
  pathname: String;
}

type Props = OwnProps & DispatchProps & StateProps;

const ActiveWorkout: React.FC<Props> = ({
  animationStyles,
  finishWorkout,
  pathname,
  workout,
}) => {
  const [ showEndWorkoutAlert, setShowEndWorkoutAlert ] = useState(false);
  /*
    An animated component will be matched to a route. React-spring is using the
    url as a key. It will hold both urls and both components while animating
    between the two states (pages).
    When we land on this page without a workout, we are redirected immediately.
    However, react-spring attempts to hold on to this component while the
    animation executes, resulting in another call to redirect, which results in
    another animation, where react-spring will then try to hold the redirecting
    component again. This continues in an infinte loop.
    Too fix this, we first check if we are transitioning from the correct url
    as well as checking for a workout prop
  */
  if (!workout && pathname === '/active-workout/') {
    return <Redirect to="/workouts/"/>;
  } else if (!workout) { // else we must be transitioning
    return null;
  } // else we have a workout and should render normally

  const finishWorkoutWithAlertTransition = () => {
    finishWorkout(workout);
    setShowEndWorkoutAlert(false);
  };

  return (
    <AnimatedSlidingPage
      style={{
        position: animationStyles.position,
        left: animationStyles.left,
      }}
    >
      <GlobalStyle hidden={showEndWorkoutAlert} />
      <ActivityList
        workout={workout}
        finishWorkoutClickHandler={() => setShowEndWorkoutAlert(true)}
      />

      <AlertConfirm
        cancelAlert={() => setShowEndWorkoutAlert(false)}
        showAlert={showEndWorkoutAlert}
        message={'Are you sure you want to finish the workout?'}
      >
        <Button
          onClick={() => setShowEndWorkoutAlert(false)}
          background={'grey'}>No</Button>
        <LinkButton
          to={{ pathname: '/home/', state: { immediate: false } }}
          onClick={finishWorkoutWithAlertTransition}
          background={purple}>Yes</LinkButton>
      </AlertConfirm>
    </AnimatedSlidingPage>
  );
};

interface DispatchProps {
  finishWorkout: (w: Workout) => ReduxAction<{}>;
}

interface StateProps {
  workout: Workout;
}

const mapDispatchToProps = {
  finishWorkout: (workout: Workout) => ({
    type: FINISH_WORKOUT,
    payload: workout,
  }),
};

const mapStateToProps = (state: State) => ({
  workout: state.activeWorkout,
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(ActiveWorkout);
