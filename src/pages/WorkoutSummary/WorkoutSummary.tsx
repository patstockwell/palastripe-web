import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router';
import styled from 'styled-components';
import {useLocation, useParams} from 'react-router-dom';

import {ActivitySummary, badgeOffsetLeft, badgeStyle} from './ActivitySummary';
import {ButtonBaseWithLink} from '../../components/SharedStyles';
import {BackLinkBanner} from '../../components/BackLinkBanner';
import {State, Activity} from '../../helpers/types';
import {Workout} from '../../reducers/workoutsReducer';
import {formatDate} from '../../helpers/functions';
import {bannerHeight, gutterWidth} from '../../helpers/constants';
import Badge from '../../assets/svg/Badge';
import {onTheFlyWorkoutId} from '../../workoutData/workouts/onTheFly';

const Hr = styled.hr`
  border: none;
  position: sticky;
  top: ${bannerHeight}px;
  border-bottom: solid 0.5px lightgrey;
`;

const PanelWithGutter = styled.div`
  padding-right: ${gutterWidth}px;
  padding-left: ${gutterWidth + badgeOffsetLeft}px;
  padding-top: 0;
  padding-bottom: ${gutterWidth}px;
`;

const Ul = styled.ul`
  list-style: none;
  margin: 16px 0;
  padding-left: 0;

  & > li + li {
    margin-top: 16px;
  }
`;

const H2 = styled.h2`
  margin: 0;
`;

const H3 = styled.h3`
  margin: 0;
  font-size: 1em;
  font-weight: 400;
  color: grey;
`;

const Info = styled.p`
  position: relative;
  font-style: italic;
  color: darkgrey;
  font-size: 0.75em;
`;

const StickyBottomButtonPanel = styled.div`
  position: sticky;
  bottom: 0;
  background-color: rgba(256, 256, 256, 0.9);
  padding: ${gutterWidth}px;
`;

const Button = styled(ButtonBaseWithLink)`
  margin: 0 auto;
  max-width: 300px;
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

export const WorkoutSummary: React.FC = () => {
  // TODO: Test this.
  const { index } = useParams();
  const { pathname } = useLocation();
  const dedicatedSummaryPage = /workout-summary/.test(pathname);
  const workoutIndex = dedicatedSummaryPage || !index ? 0 : index;
  const workout: Workout = useSelector((s: State) => s.history[workoutIndex]);

  if (!workout) {
    return <Navigate to="/activity/" />;
  }

  const { formattedDateString } = formatDate(workout.finishTime);
  const exercises = createExerciseHash(workout);
  const activitySummaryTiles = Object.entries(exercises).map(exerciseSets => (
    <ActivitySummary key={exerciseSets[0]} exerciseSets={exerciseSets} />
  ));

  return (
    <>
      <BackLinkBanner heading="Workout Summary" back={{
        showArrows: !dedicatedSummaryPage,
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
        {workout.id !== onTheFlyWorkoutId && // hide badge info for onTheFly workout
          <Info>
            <Badge style={{ ...badgeStyle, top: '-1px', fill: 'darkgrey' }} />
            *A badge means all sets and reps were completed successfully.
          </Info>
        }
      </PanelWithGutter>
      {dedicatedSummaryPage &&
        <StickyBottomButtonPanel>
          <Button to='/activity/'>Done</Button>
        </StickyBottomButtonPanel>
      }
    </>
  );
};
