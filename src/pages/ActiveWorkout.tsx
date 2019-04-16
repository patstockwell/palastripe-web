import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring/renderprops';
import BackSplash from '../components/BackSplash';
import {
  Entities, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const AnimatedSlidingPage = styled(animated.div)`
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
}

const CurrentWorkout: React.FC<Props> = ({ animationStyles }) => {
  return (
    <AnimatedSlidingPage style={{
      ...animationStyles,
    }}>
      <BackSplash>
        The new active workout page
      </BackSplash>
    </AnimatedSlidingPage>
  );
};

export default CurrentWorkout;
