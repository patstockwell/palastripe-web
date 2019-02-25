import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const TimerBackground = styled(animated.div)`
  // display: ${({ display }) => display };
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

const Timer = ({ showRestTimer, clickHandler, count }) => {
  const timerMinutes = Math.floor(count / 60);
  const timerSeconds = count % 60;
  const divStyle = useSpring({ display: showRestTimer ? 'flex' : 'none', opacity: showRestTimer ? 1 : 0 });
  const pStyle = useSpring({ height: showRestTimer ? '70px' : '0px' });

  return (
    <TimerBackground
      style={divStyle}
      onClick={clickHandler}
      display={showRestTimer ? 'flex' : 'none'}
    >
      <Number style={pStyle}>
        {timerMinutes}{timerSeconds > 9 ? ':' : ':0'}{timerSeconds}
      </Number>
    </TimerBackground>
  );
};

Timer.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  showRestTimer: PropTypes.bool.isRequired,
};

export default Timer;

