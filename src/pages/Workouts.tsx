import React, { useEffect } from 'react';
import {
  RouteProps, // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import WorkoutTile from '../components/WorkoutTile';
import Page from '../components/Page';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  SET_FIRST_RENDER_FLAG,
  navBarHeight,
} from '../helpers/constants';

const EmptySpace = styled.div`
  height: ${navBarHeight}px;
`;

type Props = RouteProps & DispatchProps & StateProps;

const Workouts: React.FC<Props> = ({
  isFirstRender,
  removeIsFirstRender,
  location,
  workouts,
  scrollY,
}) => {
  useEffect(() => {
    if (typeof scrollY === 'number') {
      window.scrollTo(0, scrollY);
    }
  });

  if (isFirstRender) {
    // remove the flag to identify first page load when static rendering
    removeIsFirstRender();
  }

  const workoutTiles = workouts.map((w: Workout) =>
    <WorkoutTile key={w.id} workout={w} />
  );

  return (
    <Page pathname={location.pathname} heading={'Workouts'}>
      {workoutTiles}
      <EmptySpace />
    </Page>
  );
};

interface StateProps {
  scrollY: number;
  workouts: Workout[];
  isFirstRender: boolean;
}

const mapStateToProps = ({
  isFirstRender,
  entities: {
    workouts: { allIds, byId },
  },
  scrollY: { WORKOUTS_PAGE },
}: State): StateProps => {
  const workouts = allIds.map(id => byId[id]);
  return { scrollY: WORKOUTS_PAGE, workouts, isFirstRender };
};

interface DispatchProps {
  removeIsFirstRender: () => ReduxAction<undefined>;
}

const mapDispatchToProps: DispatchProps = {
  removeIsFirstRender: () => ({
    type: SET_FIRST_RENDER_FLAG,
  }),
};

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(Workouts);
