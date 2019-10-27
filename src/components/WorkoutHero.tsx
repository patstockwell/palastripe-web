import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';
import * as clipboard from 'clipboard-polyfill';

import AlertConfirm from '../components/AlertConfirm';
import ShareIcon from '../assets/svg/Share';
import CircleTick from '../assets/svg/CircleTick';
import {
  workoutTitleStyle,
  workoutHeroWindowStyle,
} from './SharedStyles';
import { iconWrapperStyle } from './ActivityTile/ActivityTileSharedStyles';
import { APP_URL } from '../helpers/constants';

export const Window = styled.div<{ colour?: string, imageUrl: string }>`
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
`;

export const Time = styled.p`
  color: white;
  size: 16px;
  font-weight: 400;
  margin: 16px;
  z-index: 1;
`;

const ShareButton = styled.button`
  z-index: 1;
  position: absolute;
  right: 16px;
  top: 16px;
  border: none;
  padding: 10px;

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

const IconWrapper = styled.div`
  ${iconWrapperStyle};
  margin: 0 auto;
  animation: ${scale} 0.5s linear;
`;

interface Props {
  name: string;
  imageUrl?: string;
  time?: string;
}

const WorkoutHero = ({ time, imageUrl, name }: Props) => {
  const [ showShareMessage, setShowShareMessage ] = useState(false);
  const [ showCircleTick, setShowCircleTick ] = useState(false);
  const { pathname } = useLocation();

  const handleShare = () => {
    setShowShareMessage(true);
    clipboard.writeText(APP_URL + pathname);
  };

  return (
    <Window imageUrl={imageUrl}>
      <ShareButton onClick={handleShare}>
        <ShareIcon />
      </ShareButton>
      <Title>{name}</Title>
      <Time>{time}</Time>

      <AlertConfirm
        cancelAlert={() => setShowShareMessage(false)}
        showAlert={showShareMessage}
        message={'Share link copied to clipboard'}
        onClose={() => setShowCircleTick(false)}
      >
        <IconWrapper onAnimationEnd={() => setShowCircleTick(true)}>
          {showCircleTick &&
            <CircleTick onAnimationEnd={() => setShowShareMessage(false)} />
          }
        </IconWrapper>
      </AlertConfirm>
    </Window>
  );
};

export default WorkoutHero;
