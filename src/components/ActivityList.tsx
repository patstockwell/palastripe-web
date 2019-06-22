import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ActivityTile from './ActivityTile';
import FinishWorkoutButton from './FinishWorkoutButton';
import ActivityListHeading from './ActivityListHeading';
import {
  activityHeadingHeight,
  tileMinHeight,
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
  height: calc(100vh - ${({ offset, stickyTop = 0 }) =>
    activityHeadingHeight + tileMinHeight + stickyTop + offset}px);
`;

interface Props {
  workout: Workout;
  stickyTop?: number;
  readOnly?: boolean;
  finishWorkoutClickHandler?: () => void;
}

const ActivityList: React.FC<Props> = ({
  finishWorkoutClickHandler,
  readOnly,
  stickyTop,
  workout: { exerciseGroups },
}) => {
  const [ selected, setSelected ] = useState({ group: undefined, index: undefined });
  const [ show, setShow ] = useState(false);

  const createTile = (group: string) => (a: Activity, i) => {
    const isSelected = selected.group === group && selected.index === i;

    return (
      <ActivityTile
        selectable={!readOnly}
        selected={!readOnly && isSelected}
        show={isSelected && show}
        group={group}
        index={i}
        key={i}
        activity={a}
        handleSelect={() => {
          if (!readOnly && !isSelected) {
            setSelected({ group, index: i });
            setShow(false);
          }
        }}
        handleOpen={() => {
          if (!readOnly && isSelected) {
            setShow(!show);
          }
        }}
      />
    );
  };

  const activityListTiles = exerciseGroups.map(group => {
    const tiles = group.exercises.map(createTile(group.id));

    return (
      <ActivityListHeading
        key={group.id}
        stickyTop={stickyTop}
        heading={group.name}
        activityTotal={tiles.length}
      >
        <Ul>{tiles}</Ul>
      </ActivityListHeading>
    );
  });

  return (
    <Ul>
      {activityListTiles}

      {!readOnly &&
        <FinishWorkoutButton clickHandler={finishWorkoutClickHandler} />
      }

      <BottomEmptySpace
        stickyTop={stickyTop}
        offset={readOnly ? 0 : tileMinHeight}
      />
    </Ul>
  );
};

const mapStateToProps = (state: State) => ({
  entities: state.entities,
});

export default connect(mapStateToProps)(ActivityList);
