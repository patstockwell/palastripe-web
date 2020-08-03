import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { ONE_SECOND, appMaxWidth } from '../../helpers/constants';
import { useInterval } from '../../helpers/functions';

const TimerBackground = styled(animated.div)`
  display: flex;
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${appMaxWidth}px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5;
`;

const Count = styled(animated.p)`
  font-size: 1.5em;
  font-weight: 800;
  color: white;
`;

const Message = styled(animated.p)`
  color: white;
`;

interface Props {
  restPeriod: number;
  handleClick: () => void;
}

export const RestTimer: React.FC<Props> = ({
  handleClick,
  restPeriod,
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

  // unmount after rest period
  if (count >= restPeriod) {
    fadeAndReset();
  }

  // format the timer
  const countDown = restPeriod - count;
  const timerMinutes = Math.floor(countDown / 60);
  const timerSeconds = countDown % 60;

  return (
    <TimerBackground style={divStyle} onClick={fadeAndReset} >
      <Count>
        {timerMinutes}{timerSeconds > 9 ? ':' : ':0'}{timerSeconds}
      </Count>
      <Message>
        {'You\'re doing great, take a rest'}
      </Message>
    </TimerBackground>
  );
};
