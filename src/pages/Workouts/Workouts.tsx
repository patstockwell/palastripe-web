import React from 'react';
import {RouteProps} from 'react-router-dom';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {WorkoutCard, OnTheFlyWorkoutCard} from './WorkoutCard';
import {Page} from '../../components/Page';
import {State} from '../../helpers/types';
import {navBarHeight} from '../../helpers/constants';
import {Workout} from '../../reducers/workoutsReducer';
import {onTheFlyWorkoutId} from '../../workoutData/workouts/onTheFly';

const EmptySpace = styled.div`
  height: ${2 * navBarHeight}px;
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

interface OwnProps {
  animationStyles: React.CSSProperties;
}

type Props = RouteProps & OwnProps;

export const Workouts: React.FC<Props> = () => {
  const { allIds, byId } = useSelector((state: State) => state.workouts);

  const mappedWorkouts = allIds.map(id => byId[id]);
  const workoutCards = mappedWorkouts.map((w: Workout) =>
    w.id === onTheFlyWorkoutId
      ? <OnTheFlyWorkoutCard key={w.id} workout={w}/>
      : <WorkoutCard key={w.id} workout={w} />
  );

  return (
    <Page heading={'Workouts'}>
      <Ul>
        {workoutCards}
      </Ul>
      <EmptySpace />
    </Page>
  );
};
