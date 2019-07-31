import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const countDownSize = 130;

const TimerBackground = styled(animated.div)`
  display: flex;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5;
`;

const Number = styled(animated.p)`
  color: white;
  font-size: ${countDownSize}px;
  overflow: hidden;
`;

const NumberWrapper = styled.div`
  height: ${countDownSize}px;
  margin: 40px;
  display: flex;
  align-items: flex-end;
`;

const Message = styled(animated.p)`
  color: white;
  font-size: 17px;
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
  const [ pStyle, setPStyle ] = useSpring(() => ({
    height: `${countDownSize}px`,
    from: { height: '0px' },
    config,
  }));

  // graceful way to unmount
  const fadeAndReset = () => {
    setPStyle({ height: '0px' });
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
      <NumberWrapper>
        <Number style={pStyle}>
          {timerMinutes}{timerSeconds > 9 ? ':' : ':0'}{timerSeconds}
        </Number>
      </NumberWrapper>
      <Message>
        {'You\'re doing great, take a rest'}
      </Message>
    </TimerBackground>
  );
};

export default Timer;
