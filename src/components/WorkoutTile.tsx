import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Workout } from '../helpers/types';
import { superLightGrey, tileMinHeight } from '../helpers/constants';
import { calculateWorkoutTime } from '../helpers/functions';
import DumbbellPicture from '../assets/images/bicep-workout-1851820.jpg';
import KettleBellPicture from '../assets/images/active-body-crossfit-1533897.jpg';

const Tile = styled.section`
  height: ${tileMinHeight}px;
  border-bottom: solid ${superLightGrey} 0.5px;
  display: flex;
  align-items: center;
`;

const Square = styled.div`
  height: 70px
  width: 70px
  margin: 10px;
  background-color: black;
  flex-shrink: 0;
  position: relative;
  z-index: -2;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ i }) => i % 2 === 0 ? DumbbellPicture : KettleBellPicture});
    background-size: cover;
    opacity: 0.5;
    z-index: -1;
  }
`;

const Name = styled.h3`
  font-size: 14px;
  font-weight: 400;
`;

const Minutes = styled.p`
  color: white;
  font-weight: 800;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: initial;
`;

interface Props {
  workout: Workout;
  i: number;
}

const WorkoutTile = ({ i, workout }: Props) => {
  return (
    <StyledLink to={`/workouts/${workout.id}/`}>
      <Tile>
        <Square i={i}>
          <Minutes>{calculateWorkoutTime(workout)}min</Minutes>
        </Square>
        <div>
          <Name>
            {workout.name}
          </Name>
        </div>
      </Tile>
    </StyledLink>
  );
};

export default WorkoutTile;
