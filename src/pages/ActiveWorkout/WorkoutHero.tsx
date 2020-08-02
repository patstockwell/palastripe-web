import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';
import * as clipboard from 'clipboard-polyfill';

import { SuccessAlert } from '../../components/AlertConfirm';
import { ColouredDot } from '../../assets/svg/ColouredDot';
import { Share as ShareIcon } from '../../assets/svg/Share';
import { SoundOn } from '../../assets/svg/SoundOn';
import { SoundOff } from '../../assets/svg/SoundOff';
import {
  buttonStyle,
  workoutTitleStyle,
  workoutHeroWindowStyle,
} from '../../components/SharedStyles';
import {
  formatMinutes,
  calculateWorkoutTime,
} from '../../helpers/functions';
import { State } from '../../helpers/types';
import { Workout } from '../../reducers/workoutsReducer';
import { green, APP_URL } from '../../helpers/constants';
import { useSoundToggle } from '../../reducers/settingsReducer';
import { useSelectedExercise } from '../../context/useSelectedExercise';

export const Window = styled.div<{ colour?: string, imageUrl?: string }>`
  ${workoutHeroWindowStyle}

  // put the image in an 'after' pseudo element. Set it behind the original
  // element which has opacity giving it the dark filter look
  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ imageUrl }) => imageUrl});
    background-size: cover;
    background-position: top;
    opacity: 0.5;
  }
`;

export const Title = styled.h1`
  ${workoutTitleStyle}
  z-index: 1;
  margin-top: 16px;
`;

export const Time = styled.p`
  color: white;
  size: 16px;
  font-weight: 400;
  margin: 16px;
  z-index: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Button = styled.button`
  z-index: 1;
  border: none;
  padding: 10px;
  margin-left: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: rgba(256, 256, 256, 0.3);
`;

const slide = keyframes `
  0%, 80%, 100% {
    transform: translateX(-8px);
  }
  90% {
    transform: translateX(0px);
  }
`;

const StartButton = styled.button`
  ${buttonStyle}
  margin: 32px 0;
  color: black;
  background: white;

  & svg {
    transform: translateX(-8px);
    animation: ${slide} 2s ease-in-out;
  }
`;

interface Props {
  workout: Workout;
}

export const WorkoutHero: React.FC<Props> = ({ workout }) => {
  const [ showShareMessage, setShowShareMessage ] = useState(false);
  const { pathname } = useLocation();
  const { setSelectedExercise } = useSelectedExercise();
  const { soundOn } = useSelector((state: State) => state.settings);
  const useSound = useSoundToggle();
  const time = formatMinutes(calculateWorkoutTime(workout));

  const handleShare = () => {
    setShowShareMessage(true);
    clipboard.writeText(APP_URL + pathname);
  };

  const selectFirstExercise = () => {
    const { exerciseGroups: [firstGroup] } = workout;
    setSelectedExercise({ index: 0, groupId: firstGroup.id });
  };

  return (
    <Window imageUrl={workout.imageUrl}>
      <ButtonGroup>
        <Button onClick={() => useSound(!soundOn)}>
          {soundOn ? <SoundOn /> : <SoundOff />}
        </Button>
        <Button onClick={handleShare}>
          <ShareIcon />
        </Button>
      </ButtonGroup>
      <Title>{workout.name}</Title>
      <Time>{time}</Time>
      <StartButton onClick={selectFirstExercise}>
        <ColouredDot fill={green} />
        Start Workout
      </StartButton>

      <SuccessAlert
        message="Share link copied to clipboard."
        showMessage={showShareMessage}
        setShowMessage={setShowShareMessage}
      />
    </Window>
  );
};
