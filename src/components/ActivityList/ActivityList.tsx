import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ActivityTile from '../ActivityTile';
import { Button, LinkButton } from '../Buttons';
import ActivityListHeading from './ActivityListHeading';
import {
  activityHeadingHeight,
  tileMinHeight,
} from '../../helpers/constants';
import {
  Activity, // eslint-disable-line no-unused-vars
  Entities, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout,  // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { unorderedListStyle } from '../SharedStyles';

interface Props {
  workout: Workout;
  entities: Entities;
}

const Ul = styled.ul`
  ${unorderedListStyle}
`;

const FlexTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${tileMinHeight}px;
`;

const BottomEmptySpace = styled.div<{ stickyTop: number }>`
  height: calc(100vh - ${({ stickyTop = 0 }) =>
    activityHeadingHeight + (2 * tileMinHeight) + stickyTop}px);
`;

interface Props {
  workout: Workout;
  stickyTop?: number;
  readOnly?: boolean;
  finishWorkoutClickHandler?: () => void;
  startWorkoutClickHandler?: () => void;
}

const ActivityList: React.FC<Props> = ({
  finishWorkoutClickHandler,
  startWorkoutClickHandler,
  stickyTop,
  workout: { exerciseGroups },
}) => {
  const [ selected, setSelected ] = useState({ groupId: undefined, index: undefined });
  const [ show, setShow ] = useState(false);

  const createTile = (id: string) => (a: Activity, i: number) => {
    const isSelected = selected.groupId === id && selected.index === i;

    return (
      <ActivityTile
        selected={isSelected}
        show={isSelected && show}
        groupId={id}
        index={i}
        key={i}
        activity={a}
        handleSelect={() => {
          if (!isSelected) {
            setSelected({ groupId: id, index: i });
            setShow(false);
          }
        }}
        handleOpen={() => {
          if (isSelected) {
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

      <FlexTile>
        <Button clickHandler={finishWorkoutClickHandler}>
          Finish Workout
        </Button>
      </FlexTile>

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
