import React from 'react';
import styled from 'styled-components';
import {useSpring, animated} from 'react-spring';
import {useSelector} from 'react-redux';

import {appMaxWidth} from '../../helpers/constants';
import {green, orange} from '../../helpers/constants';
import {State} from '../../helpers/types';

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

const ONE_HOUR_IN_SECONDS = 60 * 60;

interface Props {
  count: number;
  restPeriod: number;
  handleClick: () => void;
}

export const RestTimer: React.FC<Props> = ({
  count,
  handleClick,
  restPeriod = 90, // default rest period of 90 seconds
}) => {
  const {useRestTimer = true} = useSelector((s: State) => s.settings);
  const [divStyle, setDivStyle] = useSpring(() => ({
    opacity: 1,
    from: {opacity: 0},
    config: {mass: 1, tension: 470, friction: 40},
  }));

  if (restPeriod <= 0) {
    return null;
  }

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

  return useRestTimer && (
    <TimerBackground style={divStyle} onClick={fadeAndReset} >
      <Count color={count < restPeriod ? orange : green}>
        {formatTimer(count > ONE_HOUR_IN_SECONDS ? ONE_HOUR_IN_SECONDS : count)}
      </Count>
      <Message>
        Great job, take a <strong>{formatTimer(restPeriod)}</strong> rest.
      </Message>
    </TimerBackground>
  );
};
