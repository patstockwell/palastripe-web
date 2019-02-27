import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { REST_PERIOD_IN_SECONDS } from '../helpers/constants';

const countDownSize = 90;

const TimerBackground = styled(animated.div)`
  display: flex;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

const Timer = ({ resetTimer, count }) => {
  // animation config
  const [ divStyle, setDivStyle ] = useSpring(() => ({
    opacity: 1,
    from: { opacity: 0, },
    onRest: () => count > 0 && resetTimer(),
  }));
  const [ pStyle, setPStyle ] = useSpring(() => ({
    height: `${countDownSize}px`,
    from: { height: '0px' },
    config: { mass: 3, tension: 170, friction: 40 },
  }));

  // graceful way to unmount
  const fadeAndReset = () => {
    setPStyle({ height: '0px' });
    setDivStyle({ opacity: 0, onRest: () => count > 0 && resetTimer() });
  };

  // unmount after rest period
  if (count >= REST_PERIOD_IN_SECONDS) {
    fadeAndReset();
  }

  // format the timer
  const countDown = REST_PERIOD_IN_SECONDS - count;
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
        You&apos;re doing great, take a rest
      </Message>
    </TimerBackground>
  );
};

Timer.propTypes = {
  resetTimer: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  showRestTimer: PropTypes.bool.isRequired,
};

export default Timer;

