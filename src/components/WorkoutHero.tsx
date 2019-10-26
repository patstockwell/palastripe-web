import React from 'react';
import styled from 'styled-components';

import ShareIcon from '../assets/svg/Share';
import {
  workoutTitleStyle,
  workoutHeroWindowStyle,
} from './SharedStyles';

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
  background: none;
  border: none;
  padding: 10px;
`;

interface Props {
  name: string;
  imageUrl?: string;
  time?: string;
}

const WorkoutHero = ({ time, imageUrl, name }: Props) => {
  const handleShare = () => {
    // need to do something here. Show alertconfirm with info?
  };

  return (
    <Window imageUrl={imageUrl}>
      <ShareButton onClick={handleShare}>
        <ShareIcon />
      </ShareButton>
      <Title>{name}</Title>
      <Time>{time}</Time>
    </Window>
  );
};

export default WorkoutHero;
