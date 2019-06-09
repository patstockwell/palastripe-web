import React from 'react';
import styled from 'styled-components';
import { isTimed } from '../../helpers/types';
import ActivityTileWithReps from './ActivityTileWithReps';
import ActivityTileWithTimer from './ActivityTileWithTimer';
import {
  Activity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import {
  tileMinHeight,
} from '../../helpers/constants';

export const SelectionArea = styled.button`
  order: 3;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  background: none;
`;

export const SelectComplete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  background-color: lightgrey;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  color: white;
  padding: 0;
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
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
`;

export const SubTitle = styled.p`
  color: grey;
`;

export const Duration = styled.div`
  flex-basis: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 4px;
  order: 1;
`;

export const VisibleArea = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  flex-direction: row;
  justify-content: flex-start;
  min-height: ${tileMinHeight}px;
  background-color: transparent;
`;

interface Props {
  activity: Activity;
  group: string;
  index: number;
  handleSelect: any;
  handleOpen: any;
  selectable: boolean;
  selected: boolean;
  show: boolean;
}

const ActivityTile: React.FC<Props> = ({
  activity,
  group,
  index,
  handleSelect,
  handleOpen,
  selectable,
  selected,
  show,
}) => (
  isTimed(activity)
    ? (
      <ActivityTileWithTimer
        selectable={selectable}
        selected={selected}
        group={group}
        index={index}
        activity={activity}
        handleSelect={handleSelect}
      />
    ) : (
      <ActivityTileWithReps
        selectable={selectable}
        selected={selected}
        show={show}
        group={group}
        index={index}
        activity={activity}
        handleSelect={handleSelect}
        handleOpen={handleOpen}
      />
    )
);

export default ActivityTile;
