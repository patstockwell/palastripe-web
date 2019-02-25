import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { REST_PERIOD_IN_SECONDS } from '../helpers/constants';

const TimerBackground = styled(animated.div)`
  display: flex;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
`;

const Number = styled(animated.p)`
  color: white;
  font-size: 70px;
  overflow: hidden;
`;

const Timer = ({ resetTimer, count }) => {
  // animation config
  const [ divStyle, setDivStyle ] = useSpring(() => ({
    opacity: 1,
    from: { opacity: 0, },
    onRest: () => count > 0 && resetTimer(),
  }));
  const [ pStyle, setPStyle ] = useSpring(() => ({
    height: '70px',
    from: { height: '0px' },
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
  const timerMinutes = Math.floor(count / 60);
  const timerSeconds = count % 60;

  return (
    <TimerBackground style={divStyle} onClick={fadeAndReset} >
      <Number style={pStyle}>
        {timerMinutes}{timerSeconds > 9 ? ':' : ':0'}{timerSeconds}
      </Number>
    </TimerBackground>
  );
};

Timer.propTypes = {
  resetTimer: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  showRestTimer: PropTypes.bool.isRequired,
};

export default Timer;

