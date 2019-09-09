import React, {
  CSSProperties, // eslint-disable-line no-unused-vars
  useEffect,
} from 'react';
import {
  RouteProps, // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import {
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import ActivityHistoryList from '../components/ActivityHistoryList';
import { animated } from 'react-spring';
import { connect } from 'react-redux';
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';
import ActivityHistoryHero from '../components/ActivityHistoryHero';
import { getTotalWeightLifted, getDiffInMinutes } from '../helpers/functions';

interface OwnProps {
  animationStyles: CSSProperties;
}

const getTotalMinutes = (history: Workout[]): number => (
  history.reduce((acc, curr) => (
    getDiffInMinutes(curr.startTime, curr.finishTime) + acc
  ), 0)
);

const getTotalWeight = (history: Workout[]): number => (
  history.reduce((acc, curr) => getTotalWeightLifted(curr) + acc, 0)
);

type Props = OwnProps & StateProps & RouteProps;

const Activity: React.FC<Props> = ({
  scrollY = 0,
  animationStyles,
  location,
  history,
}) => {
  useEffect(() => {
    window.scrollTo(0, scrollY);
  });

  const totalMinutes = getTotalMinutes(history);
  const totalWeight = getTotalWeight(history);

  return (
    <animated.div style={animationStyles}>
      <Banner heading={'Activity'}/>
      <ActivityHistoryHero
        totalWorkouts={history.length}
        totalMinutes={totalMinutes}
        totalWeight={totalWeight}
      />
      <ActivityHistoryList history={history} />
      <Navigation pathname={location.pathname} />
    </animated.div>
  );
};

interface StateProps {
  scrollY: number;
  history: Workout[];
}

const mapStateToProps = (state: State): StateProps => ({
  scrollY: state.scrollY.ACTIVITY_PAGE,
  history: state.history,
});

export default connect<StateProps, void, void>(mapStateToProps)(Activity);
