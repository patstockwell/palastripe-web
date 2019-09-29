import React, {
  ReactText, // eslint-disable-line no-unused-vars
} from 'react';
import {
  animated,
  AnimatedValue, // eslint-disable-line no-unused-vars
  OpaqueInterpolation, // eslint-disable-line no-unused-vars
} from 'react-spring';
import styled, { keyframes } from 'styled-components';

import {
  timedExerciseWaitPeriod,
  tileMinHeight,
} from '../../helpers/constants';

const Time = styled.p`
  font-size: 4em;
  font-weight: 800;
  margin-top: ${tileMinHeight}px;
`;

const Area = styled(animated.div)`
  display: flex;
  justify-content: center;
  cursor: default;
`;

const fade = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Message = styled.p`
  position: absolute;
  font-size: 1.5em;
  font-weight: 800;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${fade} ${timedExerciseWaitPeriod / 2}s ease-out;
  opacity: 0;
`;

interface Props {
  time: string;
  preparing: boolean;
  animatedStyles: AnimatedValue<{
    height: ReactText,
    opacity: OpaqueInterpolation<any>,
  }>;
}

const HiddenTimerArea: React.FC<Props> = ({
  preparing,
  animatedStyles,
  time,
}) => {
  return (
    <Area style={{
      height: animatedStyles.height,
      opacity: animatedStyles.opacity,
    }}>
      <Time>{time}</Time>
      {preparing &&
        <Message>Get ready</Message>
      }
    </Area>
  );
};

export default HiddenTimerArea;
