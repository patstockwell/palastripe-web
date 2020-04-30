import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Badge from '../assets/svg/Badge';
import { purple, orange } from '../helpers/constants';
import {
  Activity,
  State,
  isTimed,
  WeightedActivity,
} from '../helpers/types';
import { formatSeconds, formatWeight } from '../helpers/functions';
import Flame from '../assets/svg/Flame';

const Ul = styled.ul`
  padding: 0;
  list-style: none;
`;

const Duration = styled.span`
  flex-basis: 50px;
   & span {
    font-size: 0.7em;
    color: grey;
   }
`;

const Colour = styled.span<{ colour: string }>`
  color: ${props => props.colour};
  font-size: 0.8em;
  flex-basis: 16px;

  display: flex;
  align-items: center;
`;

const SetSummary = styled.li`
  display: flex;
`;

const ActivityName = styled.p`
  display: flex;
  position: relative;
  font-weight: 800;
`;

const WeightAndLabel = styled.span`
  flex-basis: 80px;

  & span {
    font-size: 0.7em;
    color: grey;
  }
`;

const IncrementHighlight = styled.span`
  padding: 1px 4px;
  font-size: 0.7em;
  border-radius: 3px;
  margin: 1px;
  display: flex;
  align-items: center;
  background-color: ${orange};

  & data {
    margin: 0 1px;
    font-weight: 600;
  }

  & span {
    font-size: 0.7em;
  }
`;

const IncrementBadge: React.FC<{
  increment: number;
  useKilos: boolean;
}> = ({ increment, useKilos }) => (
  increment > 0 && (
    <IncrementHighlight>
      <span>+</span>
      <data>{increment}</data>
      <span>{useKilos ? 'kg' : 'lbs'}</span>
      <Flame style={{ height: '10px', width: '10px', 'marginLeft': '4px' }} />
    </IncrementHighlight>
  )
);

const Weight: React.FC<{
  activity: WeightedActivity;
  useKilos: boolean;
}> = ({ activity, useKilos }) => {
  const { weight, label } = formatWeight(activity.weightInKilos, useKilos);
  return <WeightAndLabel>× {weight} <span>{label}</span></WeightAndLabel>;
};

interface Props {
  exerciseSets: [ string, Activity[] ];
}

export const ActivitySummary: React.FC<Props> = ({
  exerciseSets: [exerciseId, exerciseSets],
}) => {
  const { useKilos } = useSelector((state: State) => state.settings);

  const allComplete = exerciseSets.every(s =>
    !isTimed(s)
    && s.completed
    && s.repsAchieved >= s.repsGoal
  );

  const sets = exerciseSets.map((a, i) => (
    <SetSummary key={i}>
      <Colour colour={a.completed ? purple : 'grey'}>
        {a.completed ? '✓' : '✗'}
      </Colour>
      {isTimed(a) ? (
        <Duration>{formatSeconds(a.timerInSeconds)}</Duration>
      ) : (
        <>
          <Duration>
            {a.completed ? a.repsAchieved : 0}<span> {a.repsGoal && `/${a.repsGoal}`}</span>
          </Duration>
          <Weight useKilos={useKilos} activity={a} />
          {allComplete &&
            <IncrementBadge increment={a.autoIncrement} useKilos={useKilos} />
          }
        </>
      )}
    </SetSummary>
  ));

  const badgeStyle = {
    position: 'absolute',
    left: '-20px',
    top: '3px',
    fill: purple,
    width: '15px',
  };

  return (
    <li key={exerciseId}>
      <ActivityName>
        {exerciseSets[0].name}
        {allComplete && <Badge style={badgeStyle} />}
      </ActivityName>
      <Ul>{sets}</Ul>
    </li>
  );
};
