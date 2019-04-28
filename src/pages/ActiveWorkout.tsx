import React from 'react';
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
import { activeWorkoutWindowHeight } from '../helpers/constants';

export const AnimatedSlidingPage = styled(animated.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; // enables momentum scolling
`;

interface Props {
  animationStyles: any;
  workout: Workout;
}

const ActiveWorkout: React.FC<Props> = ({ animationStyles, workout }) => {

  return (
    <AnimatedSlidingPage style={{ top: animationStyles.left }}>
      <ActiveWorkoutWindow />
      <ActivityList stickyTop={activeWorkoutWindowHeight} workout={workout} />
    </AnimatedSlidingPage>
  );
};

const mapStateToProps = (state: State) => ({
  workout: state.activeWorkout,
});

export default connect(mapStateToProps)(ActiveWorkout);
