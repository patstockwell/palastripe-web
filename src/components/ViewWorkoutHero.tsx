import React from 'react';
import styled from 'styled-components';
import {
  workoutTitleStyle,
  workoutHeroWindowStyle,
} from './SharedStyles';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

export const Window = styled.div`
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

interface Props {
  name: string;
  imageUrl?: string;
  time?: string;
}

const ViewWorkoutHero = ({ time, imageUrl, name }: Props) => (
  <Window imageUrl={imageUrl}>
    <Title>{name}</Title>
    <Time>{time}</Time>
  </Window>
);

export default ViewWorkoutHero;
