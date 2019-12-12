import React from 'react';
import { connect } from 'react-redux';
import {
  RouteComponentProps,
  Redirect,
} from 'react-router';
import styled from 'styled-components';

import { darkPurple, pink } from '../helpers/constants';
import {
  State,
  Workout,
  Activity,
  isTimed,
} from '../helpers/types';
import { getTimeSince } from '../helpers/functions';

const Pink = styled.span`
  color: ${pink};
`;

const Page = styled.div`
  color: white;
  background-color: ${darkPurple};
  min-height: 100vh;
  padding: 12px;
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
  console.log(exercises);

  const exerciseTiles = Object.keys(exercises).map(key => {
    const sets: Activity[] = exercises[key];
    const allAttempted = sets.every(s => s.completed);
    const allComplete = sets.every(s =>
      !isTimed(s)
      && s.completed
      && s.repsAchieved >= s.repsGoal
    );

    const setElements = sets.map((a, i) => {
      if (isTimed(a)) {
        return <Pink key={i}>{a.completed ? '✓' : '✗'}</Pink>;
      }
      return (
        <span key={i}>
          <Pink>{a.completed ? '✓' : '✗'}</Pink>
          {a.completed ? a.repsAchieved : 0}/{a.repsGoal}{' '}
        </span>
      );
    });

    return (
      <li key={key}>
        <p>
          {allComplete && '💪 '}
          {allAttempted && '🏆 '}
          {exercises[key][0].name}
        </p>
        <p>{setElements}</p>
      </li>
    );
  });

  const { value, unitOfMeasurement } = getTimeSince(workout.finishTime);

  return (
    <Page>
      <h1>Workout Summary</h1>
      <h2>{workout.name}</h2>
      <h3>{value} {unitOfMeasurement} ago</h3>
      <ul>
        {exerciseTiles}
      </ul>
    </Page>
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
