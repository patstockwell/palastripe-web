import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { buttonStyle } from './SharedStyles';
import {
  workoutWindowViewport,
} from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const Window = styled.div`
  min-height: ${workoutWindowViewport}vh;
  position: relative;
  background-color: black;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;

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

const Title = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
  font-family: 'Muli','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-style: italic;
  z-index: 1;
`;

const Time = styled.p`
  color: white;
  size: 16px;
  font-weight: 400;
  margin: 16px;
  z-index: 1;
`;

const LinkButton = styled(Link)`
  ${buttonStyle}
`;

interface Props {
  name: string;
  imageUrl: string;
  time: string;
  setActiveWorkout: () => ReduxAction<Workout>;
}

const ViewWorkoutHero = ({ time, setActiveWorkout, imageUrl, name }: Props) => (
  <Window imageUrl={imageUrl}>
    <Title>{name}</Title>
    <Time>{time}</Time>
    <LinkButton
      to={{ pathname: '/active-workout/', state: { immediate: false } }}
      onClick={setActiveWorkout}
    >
      start
    </LinkButton>
  </Window>
);

export default ViewWorkoutHero;
