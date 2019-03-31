import React from 'react';
import styled from 'styled-components';
import { Workout } from '../helpers/types';
import { superLightGrey, tileMinHeight } from '../helpers/constants';

const Tile = styled.div`
  height: ${tileMinHeight}px;
  border-bottom: solid ${superLightGrey} 0.5px;
  display: flex;
  align-items: center;
`;

const Square = styled.div`
  height: 70px
  width: 70px
  margin: 10px;
  background-color: lightgrey;
  flex-shrink: 0;
`;

const Name = styled.h3`
  font-size: 14px;
  font-weight: 400;
`;

interface Props {
  workout: Workout;
}

const WorkoutTile = ({ workout }: Props) => {
  return (
    <Tile>
      <Square>
      </Square>
      <div>
        <Name>
          {workout.name}
        </Name>
      </div>
    </Tile>
  );
};

export default WorkoutTile;
