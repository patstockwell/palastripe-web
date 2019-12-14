import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Badge from '../assets/svg/Badge';
import { purple } from '../helpers/constants';
import {
  Activity,
  State,
  isTimed,
} from '../helpers/types';
import { formatSeconds, formatWeight } from '../helpers/functions';

const Ul = styled.ul`
  padding: 0;
  list-style: none;
`;

const Duration = styled.span`
  flex-basis: 70px;
   & span {
    font-size: 0.7em;
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
`;

interface OwnProps {
  exerciseSets: [ string, Activity[] ];
}

type Props = OwnProps & StateProps;

const ActivitySummary: React.FC<Props> = ({
  exerciseSets: [exerciseId, exerciseSets],
  useKilos,
}) => {
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
              {a.completed ? a.repsAchieved : 0}<span> /{a.repsGoal}</span>
            </Duration>
            <span>{formatWeight(a.weightInKilos, useKilos)}</span>
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

interface StateProps {
  useKilos: boolean;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    useKilos: state.settings.useKilos,
  };
};

export default connect<StateProps, void, OwnProps>(
  mapStateToProps
)(ActivitySummary);
