import React from 'react';
import { connect } from 'react-redux';
import {
  RouteComponentProps,
  Redirect,
} from 'react-router';
import styled from 'styled-components';

import ActivitySummary from '../components/ActivitySummary';
import BackLinkBanner from '../components/BackLinkBanner';
import {
  State,
  Workout,
  Activity,
} from '../helpers/types';
import { getTimeSince } from '../helpers/functions';
import { bannerHeight } from '../helpers/constants';

const Hr = styled.hr`
  border: none;
  position: sticky;
  top: ${bannerHeight}px;
  border-bottom: solid 0.5px lightgrey;
`;

const Page = styled.div`
  padding: 12px 0;

  h2, h3, & > ul {
    padding-left: 40px;
    padding-right: 12px;
  }

  & h3 {
    color: grey;
  }
`;

const Ul = styled.ul`
  list-style: none;
  margin: 16px 0;

  & > li + li {
    margin-top: 16px;
  }
`;

interface ExerciseHash {
  [key: string]: Activity[];
}

const createExerciseHash = (workout: Workout): ExerciseHash => {
  return workout.exerciseGroups
    .flatMap(group => group.exercises)
    // .filter(activity => !activity.tags.includes('stretch'))
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr.id]: [
          ...(acc[curr.id] || []),
          curr,
        ],
      };
    }, {});
};

const HistorySummary: React.FC<StateProps> = ({ workout }) => {
  if (!workout) {
    return <Redirect to="/activity/" />;
  }

  const exercises = createExerciseHash(workout);

  const activitySummaryTiles = Object.entries(exercises).map(exerciseSets => (
    <ActivitySummary key={exerciseSets[0]} exerciseSets={exerciseSets} />
  ));

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
        <Hr />
        <Ul>
          {activitySummaryTiles}
        </Ul>
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
)(HistorySummary);
