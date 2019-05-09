import React  from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ActivityTile from './ActivityTile';
import ActivityListHeading from './ActivityListHeading';
import {
  activityHeadingHeight,
  tileMinHeight,
  STRETCH,
  WARM_UP,
  WORKING_SETS,
} from '../helpers/constants';
import {
  Activity, // eslint-disable-line no-unused-vars
  Entities, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout,  // eslint-disable-line no-unused-vars
} from '../helpers/types';

interface Props {
  workout: Workout;
  entities: Entities;
}

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  list-style: none;
`;

const BottomEmptySpace = styled.div`
  height: calc(100vh - ${({ stickyTop = 0 }) =>
    activityHeadingHeight + tileMinHeight + stickyTop}px);
`;

interface Props {
  handleClick: ({ group: string, index: number }) => void;
  workout: Workout;
  stickyTop?: number;
}

const ActivityList: React.FC<Props> = ({
  handleClick,
  stickyTop,
  workout: {
    exercises: {
      warmUp,
      workingSets,
      stretch,
    },
  },
}) => {
  const warmUpTiles = warmUp.map((a: Activity, i) =>
    <ActivityTile key={i} activity={a} handleClick={
      () => handleClick({ group: WARM_UP, index: i })
    }/>
  );
  const exercisesTiles = workingSets.map((a: Activity, i) =>
    <ActivityTile key={i} activity={a} handleClick={
      () => handleClick({ group: WORKING_SETS, index: i })
    }/>
  );
  const stretchTiles = stretch.map((a: Activity, i) =>
    <ActivityTile key={i} activity={a} handleClick={
      () => handleClick({ group: STRETCH, index: i })
    }/>
  );

  return (
    <Ul>
      <Ul>
        <ActivityListHeading
          stickyTop={stickyTop}
          heading={'warm up'}
          activityTotal={warmUpTiles.length}
        />
        {warmUpTiles}
      </Ul>
      <Ul>
        <ActivityListHeading
          stickyTop={stickyTop}
          heading={'exercises'}
          activityTotal={exercisesTiles.length}
        />
        {exercisesTiles}
      </Ul>
      <Ul>
        <ActivityListHeading
          stickyTop={stickyTop}
          heading={'stretch'}
          activityTotal={stretchTiles.length}
        />
        {stretchTiles}
        <BottomEmptySpace stickyTop={stickyTop} />
      </Ul>
    </Ul>
  );
};

const mapStateToProps = (state: State) => ({
  entities: state.entities,
});

export default connect(mapStateToProps)(ActivityList);
