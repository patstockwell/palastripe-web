import React, {
  ReactText, // eslint-disable-line no-unused-vars
} from 'react';
import {
  animated,
  AnimatedValue, // eslint-disable-line no-unused-vars
  OpaqueInterpolation, // eslint-disable-line no-unused-vars
} from 'react-spring';
import styled from 'styled-components';
import { tileMinHeight } from '../../helpers/constants';

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

interface Props {
  time: string;
  animatedStyles: AnimatedValue<{
    height: ReactText,
    opacity: OpaqueInterpolation<any>,
  }>;
}

const HiddenTimerArea: React.FC<Props> = ({ animatedStyles, time }) => {
  return (
    <Area style={{
      height: animatedStyles.height,
      opacity: animatedStyles.opacity,
    }}>
      <Time>{time}</Time>
    </Area>
  );
};

export default HiddenTimerArea;
