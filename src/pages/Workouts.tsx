import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import Banner from '../components/Banner';
import WorkoutTile from '../components/WorkoutTile';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  WorkoutOutline, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  SET_FIRST_RENDER_FLAG,
  navBarHeight,
} from '../helpers/constants';

const EmptySpace = styled.div`
  height: ${navBarHeight}px;
`;

interface OwnProps {
  location: any;
}

type Props = OwnProps & DispatchProps & StateProps;

const Workouts = ({ isFirstRender, removeIsFirstRender, location, workouts}: Props) => {
  if (isFirstRender) {
    // remove the flag to identify first page load when static rendering
    removeIsFirstRender();
  }

  const workoutTiles = workouts.map((w: WorkoutOutline) =>
    <WorkoutTile key={w.id} workout={w} />
  );

  return (
    <Fragment>
      <Banner heading={'Workouts'}/>
      {workoutTiles}
      <EmptySpace />
      <Navigation pathname={location.pathname}/>
    </Fragment>
  );
};

interface StateProps {
  workouts: WorkoutOutline[];
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
