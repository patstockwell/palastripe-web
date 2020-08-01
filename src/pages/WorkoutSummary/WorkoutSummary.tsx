import React from 'react';
import { useSelector } from 'react-redux';
import {
  RouteComponentProps,
  Redirect,
} from 'react-router';
import styled from 'styled-components';

import { ActivitySummary } from './ActivitySummary';
import { BackLinkBanner } from '../../components/BackLinkBanner';
import { State, Activity } from '../../helpers/types';
import { Workout } from '../../reducers/workoutsReducer';
import { formatDate } from '../../helpers/functions';
import { bannerHeight, gutterWidth } from '../../helpers/constants';

const Hr = styled.hr`
  border: none;
  position: sticky;
  top: ${bannerHeight}px;
  border-bottom: solid 0.5px lightgrey;
`;

const PanelWithGutter = styled.div`
  padding: ${gutterWidth}px;
`;

const Ul = styled.ul`
  list-style: none;
  margin: 16px 0;
  padding-left: 32px;

  & > li + li {
    margin-top: 16px;
  }
`;

const H2 = styled.h2`
  margin: 0;
  padding-left: 32px;
`;

const H3 = styled.h3`
  margin: 0;
  padding-left: 32px;
  font-size: 1em;
  font-weight: 400;
  color: grey;
`;

interface ExerciseHash {
  [key: string]: Activity[];
}

const createExerciseHash = (workout: Workout): ExerciseHash => {
  return workout.exerciseGroups
    .flatMap(group => group.exercises)
    // .filter(activity => !activity.tags.includes('stretch'))
    .reduce((acc, curr) => {
      // Check if the new field exists (exerciseId), else use the old field (id)
      const legacyId = curr.exerciseId || (curr as any).id;
      return {
        ...acc,
        [legacyId]: [
          ...(acc[legacyId] || []),
          curr,
        ],
      };
    }, {});
};

type Props = RouteComponentProps<{ index?: string }>

export const WorkoutSummary: React.FC<Props> = ({
  match: { params: { index } }
}) => {
  const workout = useSelector((state: State) => state.history[index]);

  if (!workout) {
    return <Redirect to="/activity/" />;
  }

  const { formattedDateString } = formatDate(workout.finishTime);
  const exercises = createExerciseHash(workout);
  const activitySummaryTiles = Object.entries(exercises).map(exerciseSets => (
    <ActivitySummary key={exerciseSets[0]} exerciseSets={exerciseSets} />
  ));

  return (
    <>
      <BackLinkBanner heading="Workout Summary" back={{
        showArrows: true,
        link: '/activity/',
      }}/>
      <PanelWithGutter>
        <H2>{workout.name}</H2>
        <H3>{formattedDateString}</H3>
      </PanelWithGutter>
        <Hr />
      <PanelWithGutter>
        <Ul>
          {activitySummaryTiles}
        </Ul>
      </PanelWithGutter>
    </>
  );
};
