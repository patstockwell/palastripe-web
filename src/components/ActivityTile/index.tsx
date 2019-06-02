import React from 'react';
import styled from 'styled-components';
import { isTimed } from '../../helpers/types';
import ActivityTileWithReps from './ActivityTileWithReps';
import ActivityTileWithTimer from './ActivityTileWithTimer';
import {
  lightLightGrey,
  superLightGrey,
  tileMinHeight,
} from '../../helpers/constants';

export const Tile = styled.li`
  position: relative;
  color: ${({ selected }) => selected ? 'black' : '#444'};
  border: none;
  border-bottom: 1px solid ${lightLightGrey};
  background-color: ${({ selected }) => selected ? 'white' : superLightGrey};
`;

export const SelectionArea = styled.div`
  order: 3;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const SelectComplete = styled.button`
  border: none;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: white;
`;

export const Details = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 0 8px;
  order: 2;
  flex-grow: 1;
  overflow: hidden;
`;

export const Title = styled.h3`
  font-size: 16px;
  white-space: nowrap;
`;

export const SubTitle = styled.p`
  color: grey;
`;

export const Duration = styled.div`
  flex-basis: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 8px;
  order: 1;
`;

export const VisibleArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  min-height: ${tileMinHeight}px;
  background-color: transparent;
`;

const ActivityTile = props => (
  isTimed(props.activity)
    ? <ActivityTileWithTimer {...props} />
    : <ActivityTileWithReps {...props} />
);

export default ActivityTile;
