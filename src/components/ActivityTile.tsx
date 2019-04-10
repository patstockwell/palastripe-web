import React from 'react';
import styled from 'styled-components';
import { isTimed, Activity } from '../helpers/types';
import { superLightGrey, tileMinHeight } from '../helpers/constants';

const Tile = styled.div`
  min-height: ${tileMinHeight}px;
  border-bottom: 1px solid ${superLightGrey};
  display: flex;
  align-items: center;
`;

const Name = styled.td`
`;

const Duration = styled.td`
`;

interface Props {
  activity: Activity;
}

const ActivityTile:React.FC<Props> = ({ activity }) => {
  const duration = isTimed(activity)
    ? activity.timerInSeconds
    : activity.repsGoal;

  return (
    <Tile>
      <Duration>{duration}</Duration>
      <Name>{activity.name}</Name>
    </Tile>
  );
};

export default ActivityTile;
