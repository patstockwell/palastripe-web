import React from 'react';
import { connect } from 'react-redux';
import {
  RouteComponentProps,
  Redirect,
} from 'react-router';
import styled from 'styled-components';
import Badge from '../assets/svg/Badge';

import BackLinkBanner from '../components/BackLinkBanner';
import { purple, pink } from '../helpers/constants';
import {
  State,
  Workout,
  Activity,
  isTimed,
} from '../helpers/types';
import { getTimeSince, formatSeconds } from '../helpers/functions';

const Colour = styled.span<{ colour: string }>`
  color: ${props => props.colour};
`;

const Page = styled.ul`
  padding: 12px;

  & ul {
    list-style: none;
    padding-left: 40px
    margin: 16px 0;

    li + li {
      margin-top: 16px;
    }
  }
`;

const ActivityName = styled.p`
  display: flex;
  position: relative;
`;

const WorkoutSummary: React.FC<StateProps> = ({ workout }) => {
  if (!workout) {
    return <Redirect to="/activity/" />;
  }

  const exercises: {
    [key: string]: Activity[]
  } = workout.exerciseGroups
    .flatMap(group => group.exercises)
    .filter(activity => !activity.tags.includes('stretch'))
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr.id]: [
          ...(acc[curr.id] || []),
          curr,
        ],
      };
    }, {});

  const exerciseTiles = Object.keys(exercises).map(key => {
    const sets: Activity[] = exercises[key];
    const allComplete = sets.every(s =>
      !isTimed(s)
      && s.completed
      && s.repsAchieved >= s.repsGoal
    );

    const setElements = sets.map((a, i) => {
      if (isTimed(a)) {
        return (
          <span key={i}>
            <Colour colour={a.completed ? purple : pink} key={i}>
              {a.completed ? '✓' : '✗'}
            </Colour>
            {formatSeconds(a.timerInSeconds)}
          </span>
        );
      }
      return (
        <span key={i}>
          <Colour colour={a.completed ? purple : pink}>
            {a.completed ? '✓' : '✗'}
          </Colour>
          {a.completed ? a.repsAchieved : 0}/{a.repsGoal}{' '}
        </span>
      );
    });

    const badgeStyle = {
      position: 'absolute',
      left: '-20px',
      top: '3px',
      fill: purple,
      width: '15px',
    };

    return (
      <li key={key}>
        <ActivityName>
          {allComplete && <Badge style={badgeStyle} />}
          {exercises[key][0].name}
        </ActivityName>
        <p>{setElements}</p>
      </li>
    );
  });

  const { value, unitOfMeasurement } = getTimeSince(workout.finishTime);

  return (
    <>
      <BackLinkBanner heading="Workout Summary" back={{
        showArrows: true,
        link: '/activity/',
      }}/>
      <Page>
        <h2>{workout.name}</h2>
        <h3>{value} {unitOfMeasurement} ago</h3>
        <ul>
          {exerciseTiles}
        </ul>
      </Page>
    </>
  );
};

interface StateProps {
  workout: Workout;
}

const mapStateToProps = (
  state: State,
  { match }: RouteComponentProps<{ index?: string }>,
): StateProps => {
  const { index } = match.params;
  return {
    workout: state.history[index],
  };
};

export default connect<StateProps, void, RouteComponentProps>(
  mapStateToProps
)(WorkoutSummary);
