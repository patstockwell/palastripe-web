import React from 'react';
import {useSelector} from 'react-redux';
import {isThisWeek} from 'date-fns';

import {State} from '../../helpers/types';
import {ActivityHistoryList} from './ActivityHistoryList';
import {Page} from '../../components/Page';
import {ActivityHistoryHero} from './ActivityHistoryHero';
import {
  getTotalWeightLifted,
  getDiffInMinutes,
  convertKilosToDisplayedWeight,
} from '../../helpers/functions';

export const Activity: React.FC = () => {
  const { history, settings: { useKilos } } = useSelector((s: State) => s);
  const workoutsThisWeek = history.filter(workout => isThisWeek(
    new Date(workout.finishTime),
    { weekStartsOn: 0 }
  ));
  const weeklyMinutes = workoutsThisWeek.reduce((acc, curr) => (
    getDiffInMinutes(curr.startTime, curr.finishTime) + acc
  ), 0);
  const weeklyVolume = workoutsThisWeek.reduce((acc, curr) => (
    getTotalWeightLifted(curr) + acc
  ), 0);
  const convertedVolume = convertKilosToDisplayedWeight(weeklyVolume, useKilos);

  return (
    <Page heading={'Activity'}>
      <ActivityHistoryHero
        totalWorkouts={history.length}
        weeklyMinutes={weeklyMinutes}
        weeklyVolume={convertedVolume}
        workoutsThisWeek={workoutsThisWeek.length}
        unitOfWeight={useKilos ? 'kg' : 'lbs'}
      />
      <ActivityHistoryList history={history} />
    </Page>
  );
};
