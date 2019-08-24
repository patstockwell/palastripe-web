import React from 'react';
import uuidv4 from 'uuid/v4';
import styled from 'styled-components';
import {
  Activity, // eslint-disable-line no-unused-vars
  ActivityStats, // eslint-disable-line no-unused-vars
  isTimed,
} from '../helpers/types';
import { formatSeconds } from '../helpers/functions';
import { pink, green } from '../helpers/constants';

const Panel = styled.div`
  color: white;
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Svg = styled.svg<{ colour: string }>`
  width: 8px;
  height: 8px;
  margin: 0 4px 0 8px;
  fill: ${({ colour }) => colour};
  overflow: visible;
  padding-bottom: 2px;
`;

interface Props {
  statistics: ActivityStats;
}

const ActivityHistoryTileStats: React.FC<Props> = ({ statistics }) => {
  const exercises = statistics.exercises.map((a: Activity) => {

    if (isTimed(a)) {
      const dotColour = a.completed ? green : 'grey';

      return (
        <li key={uuidv4()}>
          <Svg colour={dotColour}>
            <circle cx="4" cy="4" r="4" />
          </Svg>
          {formatSeconds(a.completed ? a.timerInSeconds : 0)}
        </li>
      );
    } else {
      const dotColour = !a.completed ? 'grey'
        : a.repsAchieved >= a.repsGoal ? green : pink;
      return (
        <li key={uuidv4()}>
          <Svg colour={dotColour}>
            <circle cx="4" cy="4" r="4" />
          </Svg>
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
