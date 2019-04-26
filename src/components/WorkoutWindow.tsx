import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { } from '../helpers/constants';
import {
  purple,
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
  height: ${workoutWindowViewport}vh;
  position: relative;
  background-color: black;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;

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

const Start = styled(Link)`
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 30px;
  background-color: ${purple};
  text-transform: uppercase;
  font-weight: 800;
  z-index: 1;
  text-decoration: none;
  padding: 15px 25px;
`;

interface Props {
  workout: Workout;
  setActiveWorkout: (workout: Workout) => ReduxAction;
}

const WorkoutWindow = ({ setActiveWorkout, workout, workout: { imageUrl, name }}: Props) => (
  <Window imageUrl={imageUrl}>
    <Title>{name}</Title>
    <Time>{formatMinutes(calculateWorkoutTime(workout))}</Time>
    <Start
      to={{ pathname: '/active-workout/', state: { immediate: false } }}
      onClick={() => setActiveWorkout(workout)}
    >
      start
    </Start>
  </Window>
);

const mapDispatchToProps = {
  setActiveWorkout: (workout: Workout): ReduxAction => ({
    type: SET_ACTIVE_WORKOUT,
    payload: workout,
  }),
};

export default connect(null, mapDispatchToProps)(WorkoutWindow);
