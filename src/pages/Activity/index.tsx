import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../../helpers/types';
import { Workout } from '../../reducers/workoutsReducer';
import { ActivityHistoryList } from './ActivityHistoryList';
import { Page } from '../../components/Page';
import ActivityHistoryHero from './ActivityHistoryHero';
import {
  getTotalWeightLifted,
  getDiffInMinutes,
  convertKilosToDisplayedWeight,
} from '../../helpers/functions';

const getTotalMinutes = (history: Workout[]): number => (
  history.reduce((acc, curr) => (
    getDiffInMinutes(curr.startTime, curr.finishTime) + acc
  ), 0)
);

const getTotalWeight = (history: Workout[]): number => (
  history.reduce((acc, curr) => getTotalWeightLifted(curr) + acc, 0)
);

export const Activity: React.FC = () => {
  const { history, settings: { useKilos } } = useSelector((s: State) => s);
  const totalMinutes = getTotalMinutes(history);
  const totalWeight = getTotalWeight(history);
  const convertedWeight = convertKilosToDisplayedWeight(totalWeight, useKilos);

  return (
    <Page heading={'Activity'}>
      <ActivityHistoryHero
        totalWorkouts={history.length}
        totalMinutes={totalMinutes}
        totalWeight={convertedWeight}
        unitOfWeight={useKilos ? 'kg' : 'lbs'}
      />
      <ActivityHistoryList history={history} />
    </Page>
  );
};
