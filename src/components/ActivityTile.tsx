import React from 'react';
import styled from 'styled-components';
import {
  isTimed,
  Activity, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { superLightGrey, tileMinHeight } from '../helpers/constants';
import { formatSeconds } from '../helpers/functions';

const Tile = styled.li`
  min-height: ${tileMinHeight}px;
  border: none;
  border-bottom: 1px solid ${superLightGrey};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

const Name = styled.h3`
`;

const Duration = styled.div`
  flex-basis: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  activity: Activity;
}

const ActivityTile:React.FC<Props> = ({ activity }) => {
  const duration = isTimed(activity)
    ? formatSeconds(activity.timerInSeconds)
    : activity.repsGoal;

  return (
    <Tile>
      <Name>{activity.name}</Name>
      <Duration>
        <p>{duration}</p>
      </Duration>
    </Tile>
  );
};

export default ActivityTile;
