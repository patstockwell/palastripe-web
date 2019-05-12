import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { animated } from 'react-spring';
import ActivityList from '../components/ActivityList';
import ActiveWorkoutWindow from '../components/ActiveWorkoutWindow';
import {
  Entities, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  activeWorkoutWindowHeight,
  activeWorkoutWindowHeightCollapsed,
  WARM_UP,
} from '../helpers/constants';

export const AnimatedSlidingPage = styled(animated.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; // enables momentum scolling
`;

const ScrollablePanel = styled.div`
  height: calc(100vh - ${({ offsetHeight = 0 }) => offsetHeight}px);
  overflow: scroll;
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

  const [ selected, setSelected ] = useState({
    group: WARM_UP,
    index: 0,
  });
  const [ windowHeight, setWindowHeight ] = useState(activeWorkoutWindowHeight);

  const changeWindowHeight = () => setWindowHeight(
    windowHeight === activeWorkoutWindowHeight
      ? activeWorkoutWindowHeightCollapsed
      : activeWorkoutWindowHeight
  );

  return (
    <AnimatedSlidingPage style={{ top: animationStyles.left }}>
      <ActiveWorkoutWindow
        handleClick={changeWindowHeight}
        height={windowHeight}
        selected={selected}
        workout={workout}
      />
      <ScrollablePanel offsetHeight={windowHeight}>
        <ActivityList
          handleClick={setSelected}
          workout={workout}
          offsetHeight={windowHeight}
        />
      </ScrollablePanel>
    </AnimatedSlidingPage>
  );
};

const mapStateToProps = (state: State) => ({
  workout: state.activeWorkout,
});

export default connect(mapStateToProps)(ActiveWorkout);
