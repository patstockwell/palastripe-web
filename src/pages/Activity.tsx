import React, {
  Fragment,
  useEffect,
} from 'react';
import {
  RouteProps, // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import {
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import ActivityHistoryList from '../components/ActivityHistory/ActivityHistoryList';
import { connect } from 'react-redux';
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';
import ActivityHistoryHero from '../components/ActivityHistory/ActivityHistoryHero';
import {
  getTotalWeightLifted,
  getDiffInMinutes,
  convertWeight,
} from '../helpers/functions';

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
  scrollY,
  location,
  history,
  useKilos,
}) => {
  useEffect(() => {
    if (typeof scrollY === 'number') {
      window.scrollTo(0, scrollY);
    }
  });

  const totalMinutes = getTotalMinutes(history);
  const totalWeight = getTotalWeight(history);
  const convertedWeight = convertWeight(totalWeight, useKilos);

  return (
    <Fragment>
      <Banner pathname={location.pathname} heading={'Activity'}/>
      <ActivityHistoryHero
        totalWorkouts={history.length}
        totalMinutes={totalMinutes}
        totalWeight={convertedWeight}
        unitOfWeight={useKilos ? 'kg' : 'lbs'}
      />
      <ActivityHistoryList history={history} />
      <Navigation pathname={location.pathname} />
    </Fragment>
  );
};

interface StateProps {
  scrollY: number;
  history: Workout[];
  useKilos: boolean;
}

const mapStateToProps = (state: State): StateProps => ({
  scrollY: state.scrollY.ACTIVITY_PAGE,
  history: state.history,
  useKilos: state.settings.useKilos,
});

export default connect<StateProps, void, void>(mapStateToProps)(Activity);
