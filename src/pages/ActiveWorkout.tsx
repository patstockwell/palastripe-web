import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { animated } from 'react-spring';
import ActivityList from '../components/ActivityList';
import {
  Entities, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const AnimatedSlidingPageBase = styled(animated.div)`
  position: relative;
  z-index: 10;
  top: 0;
`;

export const AnimatedSlidingPage = styled(AnimatedSlidingPageBase)`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; // enables momentum scolling
`;

interface Props {
  animationStyles: any;
  workout: Workout;
  pathname: String;
}

const ActiveWorkout: React.FC<Props> = ({
  animationStyles,
  pathname,
  workout,
}) => {
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

  return (
    <AnimatedSlidingPageBase style={{ top: animationStyles.top }}>
      <ActivityList workout={workout} />
    </AnimatedSlidingPageBase>
  );
};

const mapStateToProps = (state: State) => ({
  workout: state.activeWorkout,
});

export default connect(mapStateToProps)(ActiveWorkout);
