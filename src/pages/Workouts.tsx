import React from 'react';
import { animated } from 'react-spring';
import {
  RouteProps, // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import WorkoutTile from '../components/WorkoutTile';
import Page from '../components/Page';
import { AnimatedSlidingPageStyle } from '../components/SharedStyles';
import {
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  navBarHeight,
} from '../helpers/constants';

const EmptySpace = styled.div`
  height: ${2 * navBarHeight}px;
`;

const AnimatedSlidingPage = styled(animated.div)`
  ${AnimatedSlidingPageStyle}
  z-index: 0;
`;

interface OwnProps {
  animationStyles: React.CSSProperties;
}

type Props = RouteProps & StateProps & OwnProps;

const Workouts: React.FC<Props> = ({
  location,
  workouts,
  animationStyles,
}) => {
  const workoutTiles = workouts.map((w: Workout) =>
    <WorkoutTile key={w.id} workout={w} />
  );

  return (
    <AnimatedSlidingPage style={{ left: animationStyles.right }} >
      <Page heading={'Workouts'} pathname={location.pathname} >
        {workoutTiles}
        <EmptySpace />
      </Page>
    </AnimatedSlidingPage>
  );
};

interface StateProps {
  workouts: Workout[];
}

const mapStateToProps = ({
  entities: {
    workouts: { allIds, byId },
  },
}: State): StateProps => {
  const workouts = allIds.map(id => byId[id]);
  return { workouts };
};

export default connect<StateProps, void, void>(mapStateToProps)(Workouts);
