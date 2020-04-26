import React, { ReactText } from 'react';
import { animated, AnimatedValue, OpaqueInterpolation } from 'react-spring';
import styled, { keyframes } from 'styled-components';
import startAudio from '../../../assets/activityStart.mp3';
import completeAudio from '../../../assets/activityEnd.mp3';
import { buttonStyle } from '../../../components/SharedStyles';
import {
  timedExerciseWaitPeriod,
  lightLightGrey,
  green,
  purple,
} from '../../../helpers/constants';
import { useRestTimer } from '../../../context/useRestTimer';
import { useAudio } from '../../../context/useAudio';

const Time = styled.p`
  font-size: 4em;
  font-weight: 800;
`;

const Area = styled(animated.div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${fade} ${timedExerciseWaitPeriod / 2}s ease-out;
  opacity: 0;
`;

const StartButton = styled.button<{ background?: string; fontColour?: string; }>`
  ${buttonStyle}
  margin-top: 30px;
  background-color: ${({ background }) => background};
  background-color: ${({ disabled }) => disabled && lightLightGrey};
`;

interface Props {
  time: string;
  preparing: boolean;
  completed: boolean;
  paused: boolean;
  started: boolean;
  animatedStyles: AnimatedValue<{
    height: ReactText,
    opacity: OpaqueInterpolation<any>,
  }>;
  handleButtonClick: () => void;
}

const HiddenTimerArea: React.FC<Props> = ({
  preparing,
  animatedStyles,
  time,
  started,
  paused,
  handleButtonClick,
  completed,
}) => {
  const label = !started ? 'start' : paused ? 'resume' : 'pause';
  const background = !started ? purple : paused ? green : 'grey';
  const { hideTimer } = useRestTimer();
  const { setAudio } = useAudio();

  return (
    <Area style={{
      height: animatedStyles.height,
      opacity: animatedStyles.opacity,
    }}>
      <Time>{time}</Time>
      <StartButton
        onClick={() => {
          handleButtonClick();
          hideTimer();
          // by initialising audio here after a click event, it gives the
          // user-agent permission to play the audio later
          const start = new Audio(startAudio);
          const complete = new Audio(completeAudio);
          setAudio(start, complete);

          // TODO: Replace setAudio in the audio context.
          // Create a single startAudio() function that gets called here.
          // startAudio() should create buffers (using the audio api and
          // creating a 'sine' wave, and wait 5 seconds before playing.
          // Then is should wait another minute (or however long the exercise is)
          // and then play the complete tone.
          // This means no matching to the animation end events. Just hope that
          // the sound, the counter, and the animation all line up :P
        }}
        disabled={completed}
        background={background}
      >{label}</StartButton>
      {preparing &&
        <Message>Get ready</Message>
      }
    </Area>
  );
};

export default HiddenTimerArea;
