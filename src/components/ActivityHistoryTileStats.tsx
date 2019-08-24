import React from 'react';
import uuidv4 from 'uuid/v4';
import styled from 'styled-components';
import {
  Activity, // eslint-disable-line no-unused-vars
  ActivityStats, // eslint-disable-line no-unused-vars
  isTimed,
} from '../helpers/types';
import { formatSeconds } from '../helpers/functions';

const Panel = styled.div`
  color: white;
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

interface Props {
  statistics: ActivityStats;
}

const ActivityHistoryTileStats: React.FC<Props> = ({ statistics }) => {
  const exercises = statistics.exercises.map((a: Activity) => {
    if (isTimed(a)) {
      return (
        <li key={uuidv4()}>{formatSeconds(a.completed ? a.timerInSeconds : 0)}</li>
      );
    } else {
      return (
        <li key={uuidv4()}>
          {a.completed ? a.repsAchieved : 0}/{a.repsGoal}
        </li>
      );
    }
  });

  return (
    <Panel>
      <h3>{statistics.name}</h3>
      <Ul>
        {exercises}
      </Ul>
    </Panel>
  );
};

export default ActivityHistoryTileStats;
