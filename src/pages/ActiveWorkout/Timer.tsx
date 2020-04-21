import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { appMaxWidth } from '../../helpers/constants';

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
  resetTimer: () => void;
  count: number;
  restPeriod: number;
}

const Timer: React.FC<Props> = ({ resetTimer, count, restPeriod }) => {
  // animation config
  const config = { mass: 1, tension: 470, friction: 40 };
  const [ divStyle, setDivStyle ] = useSpring(() => ({
    opacity: 1,
    from: { opacity: 0, },
    config,
  }));

  // graceful way to unmount
  const fadeAndReset = () => {
    setDivStyle({ opacity: 0, onRest: resetTimer });
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

export default Timer;
