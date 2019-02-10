import React from 'react';
import styled from 'styled-components';
import LayoutTile from './LayoutTile';
import { workoutTileMinHeight } from '../helpers/constants';

const Tile = styled(LayoutTile)`
  min-height: ${workoutTileMinHeight}px;
  border: 1px solid rgba(256, 256, 256, 0.3);
  background-color: rgba(256, 256, 256, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.p`
  color: black;
`;

const EmptyHistoryTile = () => (
  <Tile>
    <Info>Your workout history will appear here</Info>
  </Tile>
);

export default EmptyHistoryTile;

