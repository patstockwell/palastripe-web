import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { ONE_SECOND, appMaxWidth } from '../../helpers/constants';
import { useInterval } from '../../helpers/functions';
import { green, orange } from '../../helpers/constants';

const TimerBackground = styled(animated.div)`
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${appMaxWidth}px;
  align-items: center;
  z-index: 5;
`;

const Count = styled(animated.p)<{ color: string }>`
  font-size: 1.5em;
  font-weight: 800;
  color: ${props => props.color};
`;

const Message = styled(animated.p)`
  color: white;
  margin-left: 0.75em;
`;

interface Props {
  restPeriod: number;
  handleClick: () => void;
}

export const RestTimer: React.FC<Props> = ({
  handleClick,
  restPeriod = 90, // default rest period of 90 seconds
}) => {
  const [ count, setCount ] = useState(0);
  const [ divStyle, setDivStyle ] = useSpring(() => ({
    opacity: 1,
    from: { opacity: 0 },
    config: { mass: 1, tension: 470, friction: 40 },
  }));

  useInterval(() => setCount(count + 1), ONE_SECOND);

  // graceful way to unmount
  const fadeAndReset = () => {
    setDivStyle({ opacity: 0, onRest: () => {
      handleClick();
    }});
  };

  const formatTimer = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}${seconds > 9 ? ':' : ':0'}${seconds}`;
  };

  return (
    <TimerBackground style={divStyle} onClick={fadeAndReset} >
      <Count color={count < restPeriod ? orange : green}>
        {formatTimer(count)}
      </Count>
      <Message>
        Great job, take a <strong>{formatTimer(restPeriod)}</strong> rest.
      </Message>
    </TimerBackground>
  );
};
