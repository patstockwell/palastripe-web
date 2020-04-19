import React, { useState } from 'react';
import styled from 'styled-components';
import ActivityTile from '../ActivityTile';
import ColouredDot from '../../../assets/svg/ColouredDot';
import { ActivityListHeading } from './ActivityListHeading';
import {
  activityHeadingHeight,
  orange,
  tileMinHeight,
} from '../../../helpers/constants';
import { Activity } from '../../../helpers/types';
import { Workout } from '../../../reducers/workoutsReducer';
import { buttonStyle, unorderedListStyle } from '../../../components/SharedStyles';
import { useSelectedExercise } from '../../../context/useSelectedExercise';

const Ul = styled.ul`
  ${unorderedListStyle}
`;

const Button = styled.button`
  ${buttonStyle}
  background-color: black;

  & svg {
    transform: translateX(-8px);
  }
`;

const FlexTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${tileMinHeight}px;
`;

const BottomEmptySpace = styled.div<{ stickyTop?: number}>`
  // height: calc(100vh - ${({ stickyTop = 0 }) => activityHeadingHeight + (2 * tileMinHeight) + stickyTop}px);
  height: ${tileMinHeight}px;
`;

interface Props {
  workout: Workout;
  finishWorkoutClickHandler?: () => void;
}

const ActivityList: React.FC<Props> = ({
  finishWorkoutClickHandler,
  workout: { exerciseGroups },
}) => {
  const [ showHiddenArea, setShowHiddenArea ] = useState(true);
  const { selectedExercise, setSelectedExercise } = useSelectedExercise();

  const createTile = (id: string) => (a: Activity, i: number) => {
    const isSelected =
      selectedExercise.groupId === id
      && selectedExercise.index === i;

    return (
      <ActivityTile
        selected={isSelected}
        showHiddenArea={isSelected && showHiddenArea}
        groupId={id}
        index={i}
        key={i}
        activity={a}
        handleSelect={() => {
          if (!isSelected) {
            setSelectedExercise({ groupId: id, index: i });
          }
        }}
        toggleShowHiddenArea={() => {
          if (isSelected) {
            setShowHiddenArea(!showHiddenArea);
          }
        }}
      />
    );
  };

  const activityListTiles = exerciseGroups.map(group => {
    const tiles = group.exercises.map(createTile(group.id));
    const completedActivities = group.exercises.filter(e => e.completed);

    return (
      <ActivityListHeading
        key={group.id}
        heading={group.name}
        activityTotal={tiles.length}
        completedActivities={completedActivities.length}
      >
        <Ul>{tiles}</Ul>
      </ActivityListHeading>
    );
  });

  return (
    <Ul>
      {activityListTiles}

      <FlexTile>
        <Button onClick={finishWorkoutClickHandler}>
          <ColouredDot fill={orange} />
          Finish Workout
        </Button>
      </FlexTile>

      <BottomEmptySpace />
    </Ul>
  );
};

export default ActivityList;
