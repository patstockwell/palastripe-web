import React, { useState } from 'react';
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
  workout: Workout;
  stickyTop?: number;
  selectable?: boolean;
}

const ActivityList: React.FC<Props> = ({
  selectable,
  stickyTop,
  workout: {
    exercises: {
      warmUp,
      workingSets,
      stretch,
    },
  },
}) => {
  const [ selected, setSelected ] = useState({ group: undefined, index: undefined });
  const [ show, setShow ] = useState(false);

  const createTile = (group: string) => (a: Activity, i) => {
    const isSelected = selected.group === group && selected.index === i;

    return (
      <ActivityTile
        selectable={selectable}
        selected={selectable && isSelected}
        show={isSelected && show}
        group={group}
        index={i}
        key={i}
        activity={a}
        handleSelect={() => {
          if (selectable && !isSelected) {
            setSelected({ group, index: i });
            setShow(false);
          }
        }}
        handleOpen={() => {
          if (selectable && isSelected) {
            setShow(!show);
          }
        }}
      />
    );
  };

  const warmUpTiles = warmUp.map(createTile(WARM_UP));
  const exercisesTiles = workingSets.map(createTile(WORKING_SETS));
  const stretchTiles = stretch.map(createTile(STRETCH));

  return (
    <Ul>
      <ActivityListHeading
        stickyTop={stickyTop}
        heading={'warm up'}
        activityTotal={warmUpTiles.length}
      >
        <Ul>{warmUpTiles}</Ul>
      </ActivityListHeading>

      <ActivityListHeading
        stickyTop={stickyTop}
        heading={'exercises'}
        activityTotal={exercisesTiles.length}
      >
        <Ul>{exercisesTiles}</Ul>
      </ActivityListHeading>

      <ActivityListHeading
        stickyTop={stickyTop}
        heading={'stretch'}
        activityTotal={stretchTiles.length}
      >
        <Ul>{stretchTiles}</Ul>
      </ActivityListHeading>

      <BottomEmptySpace
        stickyTop={stickyTop}
      />
    </Ul>
  );
};

const mapStateToProps = (state: State) => ({
  entities: state.entities,
});

export default connect(mapStateToProps)(ActivityList);
