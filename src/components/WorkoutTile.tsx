import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import {opaqueImageInAfter} from './SharedStyles';
import {Workout} from '../reducers/workoutsReducer';
import {
  purple,
  gutterWidth,
  lightGrey3,
  workoutTileMinHeight,
} from '../helpers/constants';
import {FastClock} from '../assets/svg/FastClock';
import {calculateWorkoutTime, formatMinutes} from '../helpers/functions';
import {useScrollPosition} from '../context/useScrollPosition';
import {LightningBolt} from '../assets/svg/LightningBolt';
import {State} from '../helpers/types';
import {customWorkoutId} from '../workoutData/workouts/customWorkout';

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

export const InProgress = styled.p`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  color: ${purple};
  text-transform: uppercase;
  font-size: 0.75em;
  font-weight: 800;
  top: 0;
  margin: ${gutterWidth}px;
  font-style: italic;
`;

interface Props {
  workout: Workout;
}

export const WorkoutTile: React.FC<Props> = ({ workout }) => {
  const {
    id,
    startTime,
  } = useSelector((state: State) => state.activeWorkout) || {};
  const {setWorkoutPageScrollPosition} = useScrollPosition();

  return (
    <Tile>
      <Square image={workout.imageUrl}>
        <Minutes>{formatMinutes(calculateWorkoutTime(workout))}</Minutes>
      </Square>
      {startTime && id === workout.id && (
        <InProgress>
          <FastClock style={{
            fill: '#6702ff',
            marginRight: '4px',
            height: '16px',
          }}/>
          In progress...
        </InProgress>
      )}
      <StyledLink
        onClick={() => setWorkoutPageScrollPosition()}
        to={`/workouts/${workout.id}/`}
      >
        <Name>{workout.name}</Name>
      </StyledLink>
    </Tile>
  );
};

export const CustomWorkoutTile: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const {
    id,
    startTime,
  } = useSelector((state: State) => state.activeWorkout) || {};

  return (
    <Tile>
      <Square image={imageUrl}>
        <Minutes>
          <LightningBolt />
        </Minutes>
      </Square>
      {startTime && id === customWorkoutId && (
        <InProgress>
          <FastClock style={{
            fill: '#6702ff',
            marginRight: '4px',
            height: '16px',
          }}/>
          In progress...
        </InProgress>
      )}
      <StyledLink to="/workouts/custom-workout/">
        <Name>Track a workout on the fly</Name>
      </StyledLink>
    </Tile>
  );
};
