import React  from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ActivityTile from './ActivityTile';
import {
  activityHeadingHeight,
  superLightGrey,
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

const ActivityHeading = styled.li`
  height: ${activityHeadingHeight}px;
  background-color: ${superLightGrey};
  display: flex;
  align-items: center;
  position: sticky;
  top: ${({ top }) => top || 0}px;

  h2 {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
    margin: 0 12px;
  }
`;

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
  handleClick?: any;
  workout: Workout;
  stickyTop?: number;
}

const ActivityList: React.FC<Props> = ({
  handleClick = () => {},
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
        <ActivityHeading top={stickyTop}>
          <h2>warm up</h2>
        </ActivityHeading>
        {warmUpTiles}
      </Ul>
      <Ul>
        <ActivityHeading top={stickyTop}>
          <h2>exercises</h2>
        </ActivityHeading>
        {exercisesTiles}
      </Ul>
      <Ul>
        <ActivityHeading top={stickyTop}>
          <h2>stretch</h2>
        </ActivityHeading>
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
