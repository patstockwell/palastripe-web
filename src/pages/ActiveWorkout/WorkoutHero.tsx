import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import styled, {keyframes} from 'styled-components';
import {useLocation} from 'react-router-dom';
import * as clipboard from 'clipboard-polyfill';
import {format} from 'date-fns';

import {
  AlertConfirm,
  AlertButtonBlue,
  AlertButtonOrange,
  SuccessAlert,
} from '../../components/AlertConfirm';
import {StopWatch} from '../../assets/svg/StopWatch';
import {ColouredDot} from '../../assets/svg/ColouredDot';
import {Share as ShareIcon} from '../../assets/svg/Share';
import {SoundOn} from '../../assets/svg/SoundOn';
import {SoundOff} from '../../assets/svg/SoundOff';
import {
  ButtonBase,
  workoutTitleStyle,
  workoutHeroWindowStyle,
} from '../../components/SharedStyles';
import {
  formatMinutes,
  calculateWorkoutTime,
} from '../../helpers/functions';
import {State} from '../../helpers/types';
import {Workout} from '../../reducers/workoutsReducer';
import {green, APP_URL, orange} from '../../helpers/constants';
import {useActiveWorkout} from '../../reducers/activeWorkoutReducer';
import {useSettings} from '../../reducers/settingsReducer';
import {useSelectedExercise} from '../../context/useSelectedExercise';

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
  display: flex;
  align-items: flex-end;
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

const ResetButton = styled(ButtonBase)`
  margin: 32px 0;
  color: black;
  background: white;
`;

const StartButton = styled(ButtonBase)`
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
  const [showShareMessage, setShowShareMessage] = useState(false);
  const [showResetWorkoutAlert, setShowResetWorkoutAlert] = useState(false);
  const {pathname} = useLocation();
  const {setSelectedExercise} = useSelectedExercise();
  const {startWorkout, clearActiveWorkout} = useActiveWorkout();
  const {soundOn} = useSelector((state: State) => state.settings);
  const {setUseSound} = useSettings();
  const time = formatMinutes(calculateWorkoutTime(workout));

  const handleShare = () => {
    setShowShareMessage(true);
    clipboard.writeText(APP_URL + pathname);
  };

  const handleStartButtonClick = () => {
    const { exerciseGroups: [firstGroup] } = workout;
    setSelectedExercise({ index: 0, groupId: firstGroup.id });
    startWorkout();
  };

  const displayedTime = workout.startTime
    ? format(new Date(workout.startTime), 'p')
    : `≈${time}`;

  return (
    <Window imageUrl={workout.imageUrl}>
      <ButtonGroup>
        <Button onClick={() => setUseSound(!soundOn)}>
          {soundOn ? <SoundOn /> : <SoundOff />}
        </Button>
        <Button onClick={handleShare}>
          <ShareIcon />
        </Button>
      </ButtonGroup>
      <Title>{workout.name}</Title>
      <Time>
        <StopWatch style={{ fill: 'white', marginRight: '8px' }}/>
        {displayedTime}
      </Time>
      {workout.startTime ? (
        <ResetButton onClick={() => setShowResetWorkoutAlert(true)}>
          <ColouredDot fill={orange} />
          Reset Workout
        </ResetButton>
      ) : (
        <StartButton onClick={handleStartButtonClick}>
          <ColouredDot fill={green} />
          Start Workout
        </StartButton>
      )}

      <AlertConfirm
        cancelAlert={() => setShowResetWorkoutAlert(false)}
        showAlert={showResetWorkoutAlert}
        messageText="This will clear the current workout and all progress will be lost."
      >
        <AlertButtonOrange onClick={() => {
          clearActiveWorkout();
          setShowResetWorkoutAlert(false);
        }}>
          Reset Workout
        </AlertButtonOrange>

        <br />

        <AlertButtonBlue onClick={() => setShowResetWorkoutAlert(false)}>
          Cancel
        </AlertButtonBlue>
      </AlertConfirm>

      <SuccessAlert
        message="Share link copied to clipboard."
        showMessage={showShareMessage}
        setShowMessage={setShowShareMessage}
      />
    </Window>
  );
};
