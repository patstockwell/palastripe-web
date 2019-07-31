import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import AddWorkoutLink from '../components/AddWorkoutLink';
import Banner from '../components/Banner';
import WorkoutTile from '../components/WorkoutTile';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  SET_FIRST_RENDER_FLAG,
  tileMinHeight,
  bannerHeight,
} from '../helpers/constants';

const EmptySpace = styled.div`
  height: calc(100vh - ${tileMinHeight + (2 * bannerHeight)}px);
`;

interface OwnProps {
  location: any;
  workouts: Workout[];
}

type Props = OwnProps & DispatchProps & StateProps;

const Workouts = ({ isFirstRender, removeIsFirstRender, location, workouts}: Props) => {
  if (isFirstRender) {
    // remove the flag to identify first page load when static rendering
    removeIsFirstRender();
  }

  const workoutTiles = workouts.map((w: Workout) =>
    <WorkoutTile key={w.id} workout={w} />
  );

  return (
    <Fragment>
      <Banner heading={'Workouts'}/>
      <AddWorkoutLink />
      {workoutTiles}
      <EmptySpace />
      <Navigation pathname={location.pathname}/>
    </Fragment>
  );
};

interface StateProps {
  workouts: Workout[];
  isFirstRender: boolean;
}

const mapStateToProps = ({ isFirstRender, entities: { workouts: { allIds, byId }}}: State): StateProps => {
  const workouts = allIds.map(id => byId[id]);
  return { workouts, isFirstRender };
};

interface DispatchProps {
  removeIsFirstRender: () => ReduxAction<undefined>;
}

const mapDispatchToProps: DispatchProps = {
  removeIsFirstRender: () => ({
    type: SET_FIRST_RENDER_FLAG,
  }),
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Workouts);
