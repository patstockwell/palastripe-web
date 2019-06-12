import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { buttonStyle } from './SharedStyles';
import {
  workoutWindowViewport,
  SET_ACTIVE_WORKOUT,
} from '../helpers/constants';
import {
  calculateWorkoutTime,
  formatMinutes,
} from '../helpers/functions';
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
  workout: Workout;
  setActiveWorkout: (workout: Workout) => ReduxAction<Workout>;
}

const ViewWorkoutHero = ({ setActiveWorkout, workout, workout: { imageUrl, name }}: Props) => (
  <Window imageUrl={imageUrl}>
    <Title>{name}</Title>
    <Time>{formatMinutes(calculateWorkoutTime(workout))}</Time>
    <LinkButton
      to={{ pathname: '/active-workout/', state: { immediate: false } }}
      onClick={() => setActiveWorkout(workout)}
    >
      start
    </LinkButton>
  </Window>
);

const mapDispatchToProps = {
  setActiveWorkout: (workout: Workout): ReduxAction<Workout> => ({
    type: SET_ACTIVE_WORKOUT,
    payload: workout,
  }),
};

export default connect(null, mapDispatchToProps)(ViewWorkoutHero);
