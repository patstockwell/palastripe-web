import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { opaqueImageInAfter } from './SharedStyles';
import { Workout } from '../reducers/workoutsReducer';
import {
  gutterWidth,
  lightGrey3,
  workoutTileMinHeight,
} from '../helpers/constants';
import { calculateWorkoutTime, formatMinutes } from '../helpers/functions';
import { useScrollPosition } from '../context/useScrollPosition';
import { LightningBolt } from '../assets/svg/LightningBolt';

const Tile = styled.li`
  position: relative;
  height: ${workoutTileMinHeight}px;
  padding: 0 ${gutterWidth}px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${lightGrey3};
  overflow: hidden;
`;

const Square = styled.div<{ image?: string }>`
  height: 70px
  width: 70px
  background-color: black;
  flex-shrink: 0;
  position: relative;
  z-index: -2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;

  // put the image in an 'after' pseudo element. Set it behind the original
  // element which has opacity giving it the dark filter look
  &::after {
    ${opaqueImageInAfter};
  }
`;

const Name = styled.h3`
  font-size: 16px;
  font-weight: 400;
  margin-left: 10px;
`;

const Minutes = styled.p`
  display: flex;
  color: white;
  font-weight: 800;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: initial;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

interface Props {
  workout: Workout;
}

export const WorkoutTile: React.FC<Props> = ({ workout }) => {
  const { setWorkoutPageScrollPosition } = useScrollPosition();

  return (
    <Tile>
      <Square image={workout.imageUrl}>
        <Minutes>{formatMinutes(calculateWorkoutTime(workout))}</Minutes>
      </Square>
      <StyledLink
        onClick={() => setWorkoutPageScrollPosition()}
        to={`/workouts/${workout.id}/`}
      >
        <Name>{workout.name}</Name>
      </StyledLink>
    </Tile>
  );
};

export const CustomWorkoutTile: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <Tile>
    <Square image={imageUrl}>
      <Minutes>
        <LightningBolt />
      </Minutes>
    </Square>
    <StyledLink to="/workouts/custom-workout/">
      <Name>Track a workout on the fly</Name>
    </StyledLink>
  </Tile>
);
