import React from 'react';
import {RouteProps} from 'react-router-dom';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {HorizontalRuleSpacer} from '../../components/AlertConfirm';
import {WorkoutCard, OnTheFlyWorkoutCard, InProgressCard} from './WorkoutCard';
import {Page} from '../../components/Page';
import {State} from '../../helpers/types';
import {gutterWidth, navBarHeight} from '../../helpers/constants';
import {onTheFlyWorkoutId} from '../../workoutData/workouts/onTheFly';

const PageGutter = styled.div`
  padding: ${gutterWidth}px;
`;

const EmptySpace = styled.div`
  height: ${2 * navBarHeight}px;
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Workouts: React.FC<RouteProps> = () => {
  const {
    workouts: {allIds, byId},
    activeWorkout,
  } = useSelector((state: State) => state);

  const mappedWorkouts = allIds.map(id => byId[id]);
  const onTheFly = mappedWorkouts
    .filter(w => w.id === onTheFlyWorkoutId)
    .pop();
  const workoutCards = mappedWorkouts
    .filter(w => w.id !== onTheFlyWorkoutId)
    .map(w => <WorkoutCard key={w.id} workout={w} />);

  return (
    <Page heading={'Workouts'}>
      <PageGutter>
        {activeWorkout && activeWorkout.startTime &&
          <>
            <h2>In Progress</h2>
            <InProgressCard workout={activeWorkout} />
            <HorizontalRuleSpacer />
          </>
        }
        <h2>Quick Start</h2>
        <OnTheFlyWorkoutCard key={onTheFly.id} workout={onTheFly}/>
        <HorizontalRuleSpacer />
        <h2>Recommended</h2>
        <Ul>
          {workoutCards}
        </Ul>
        <EmptySpace />
      </PageGutter>
    </Page>
  );
};
