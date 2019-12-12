import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Dispatch, // eslint-disable-line no-unused-vars
} from 'redux';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';
import * as clipboard from 'clipboard-polyfill';

import CheckboxTick from '../components/CheckboxTick';
import AlertConfirm from '../components/AlertConfirm';
import ColouredDot from '../assets/svg/ColouredDot';
import ShareIcon from '../assets/svg/Share';
import SoundOn from '../assets/svg/SoundOn';
import SoundOff from '../assets/svg/SoundOff';
import {
  buttonStyle,
  workoutTitleStyle,
  workoutHeroWindowStyle,
} from './SharedStyles';
import {
  formatMinutes,
  calculateWorkoutTime,
} from '../helpers/functions';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  SelectedExercise, // eslint-disable-line no-unused-vars
  SingleSetAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  SET_SELECTED_EXERCISE,
  green,
  APP_URL,
} from '../helpers/constants';
import {
  toggleSound as toggleSoundActionCreator,
  ToggleSound,
} from '../reducers/settingsReducer';

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

const scale = keyframes `
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`;

const slide = keyframes `
  0%, 80%, 100% {
    transform: translateX(-8px);
  }
  90% {
    transform: translateX(0px);
  }
`;

const IconWrapper = styled.div`
  margin: 0 auto;
  animation: ${scale} 0.5s linear;
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

interface OwnProps {
  workout: Workout;
}

type Props = OwnProps & DispatchProps & StateProps;

const WorkoutHero: React.FC<Props> = ({
  workout,
  workout: { imageUrl, name },
  setSelected,
  soundOn,
  toggleSound,
}) => {
  const [ showShareMessage, setShowShareMessage ] = useState(false);
  const [ showCircleTick, setShowCircleTick ] = useState(false);
  const { pathname } = useLocation();
  const time = formatMinutes(calculateWorkoutTime(workout));

  const handleShare = () => {
    setShowShareMessage(true);
    clipboard.writeText(APP_URL + pathname);
  };

  return (
    <Window imageUrl={imageUrl}>
      <ButtonGroup>
        <Button onClick={() => toggleSound(!soundOn)}>
          {soundOn ? <SoundOn /> : <SoundOff />}
        </Button>
        <Button onClick={handleShare}>
          <ShareIcon />
        </Button>
      </ButtonGroup>
      <Title>{name}</Title>
      <Time>{time}</Time>
      <StartButton onClick={setSelected}>
        <ColouredDot fill={green} />
        Start Workout
      </StartButton>

      <AlertConfirm
        cancelAlert={() => setShowShareMessage(false)}
        showAlert={showShareMessage}
        message={'Share link copied to clipboard'}
        onClose={() => setShowCircleTick(false)}
      >
        <IconWrapper onAnimationEnd={() => setShowCircleTick(true)}>
          <CheckboxTick
            checked={showCircleTick}
            onAnimationEnd={() => setShowShareMessage(false)}
          />
        </IconWrapper>
      </AlertConfirm>
    </Window>
  );
};

interface StateProps {
  soundOn: boolean;
}

interface DispatchProps {
  setSelected: () => ReduxAction<SelectedExercise>;
  toggleSound: ToggleSound;
}

const mapStateToProps = (state: State): StateProps => ({
  soundOn: state.settings.soundOn,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ReduxAction<SingleSetAction | boolean>>,
  ownProps: OwnProps
): DispatchProps => {
  const {
    workout: {
      exerciseGroups: [ firstGroup ],
    },
  } = ownProps;
  const groupId = firstGroup.id;
  const index = 0;

  return {
    toggleSound: toggleSoundActionCreator,
    setSelected: () => dispatch({
      type: SET_SELECTED_EXERCISE,
      payload: { groupId, index },
    }),
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(WorkoutHero);
