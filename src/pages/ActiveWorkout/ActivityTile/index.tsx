import React from 'react';
import styled from 'styled-components';
import { isTimed } from '../../../helpers/types';
import ActivityTileWithReps from './ActivityTileWithReps';
import ActivityTileWithTimer from './ActivityTileWithTimer';
import {
  Activity, // eslint-disable-line no-unused-vars
} from '../../../helpers/types';
import {
  tileMinHeight,
} from '../../../helpers/constants';

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
  z-index: 1;
`;

interface Props {
  activity: Activity;
  groupId: string;
  index: number;
  handleSelect?: () => void;
  toggleShowHiddenArea?: () => void;
  selected?: boolean;
  showHiddenArea?: boolean;
}

const ActivityTile: React.FC<Props> = ({
  activity,
  groupId,
  index,
  handleSelect,
  toggleShowHiddenArea,
  selected,
  showHiddenArea,
}) => (
  isTimed(activity)
    ? (
      <ActivityTileWithTimer
        selected={selected}
        showHiddenArea={showHiddenArea}
        groupId={groupId}
        index={index}
        activity={activity}
        handleSelect={handleSelect}
        toggleShowHiddenArea={toggleShowHiddenArea}
      />
    ) : (
      <ActivityTileWithReps
        selected={selected}
        showHiddenArea={showHiddenArea}
        groupId={groupId}
        index={index}
        activity={activity}
        handleSelect={handleSelect}
        toggleShowHiddenArea={toggleShowHiddenArea}
      />
    )
);

export default ActivityTile;