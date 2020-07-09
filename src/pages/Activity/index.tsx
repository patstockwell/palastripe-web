import React from 'react';
import { RouteProps } from 'react-router-dom';
import { State } from '../../helpers/types';
import { Workout } from '../../reducers/workoutsReducer';

import ActivityHistoryList from './ActivityHistoryList';
import { connect } from 'react-redux';
import { Page } from '../../components/Page';
import ActivityHistoryHero from './ActivityHistoryHero';
import {
  getTotalWeightLifted,
  getDiffInMinutes,
  convertWeight,
} from '../../helpers/functions';

const getTotalMinutes = (history: Workout[]): number => (
  history.reduce((acc, curr) => (
    getDiffInMinutes(curr.startTime, curr.finishTime) + acc
  ), 0)
);

const getTotalWeight = (history: Workout[]): number => (
  history.reduce((acc, curr) => getTotalWeightLifted(curr) + acc, 0)
);

type Props = StateProps & RouteProps;

const Activity: React.FC<Props> = ({
  location,
  history,
  useKilos,
}) => {
  const totalMinutes = getTotalMinutes(history);
  const totalWeight = getTotalWeight(history);
  const convertedWeight = convertWeight(totalWeight, useKilos);

  return (
    <Page heading={'Activity'} pathname={location.pathname} >
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

interface StateProps {
  history: Workout[];
  useKilos: boolean;
}

const mapStateToProps = (state: State): StateProps => ({
  history: state.history,
  useKilos: state.settings.useKilos,
});

export default connect<StateProps, void, void>(mapStateToProps)(Activity);
