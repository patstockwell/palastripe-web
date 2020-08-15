import React, {useState} from 'react';
import styled from 'styled-components';
import {ActivityTile} from '../ActivityTile';
import {ColouredDot} from '../../../assets/svg/ColouredDot';
import {ActivityListHeading} from './ActivityListHeading';
import {
  pink,
  tileMinHeight,
} from '../../../helpers/constants';
import {Activity} from '../../../helpers/types';
import {Workout} from '../../../reducers/workoutsReducer';
import {ButtonBase, unorderedListStyle} from '../../../components/SharedStyles';
import {useSelectedExercise} from '../../../context/useSelectedExercise';
import {AddActivityTile} from '../AddActivityTile';

const Ul = styled.ul`
  ${unorderedListStyle}
`;

const Button = styled(ButtonBase)`
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
  margin-top: 30px;
`;

const BottomEmptySpace = styled.div<{ stickyTop?: number}>`
  height: ${tileMinHeight * 3}px;
`;

interface Props {
  workout: Workout;
  finishWorkoutClickHandler?: () => void;
  isOnTheFlyWorkout?: boolean;
  checkCanSelectTile: (callback: () => void) => void;
}

export const ActivityList: React.FC<Props> = ({
  finishWorkoutClickHandler,
  workout: { startTime, exerciseGroups },
  isOnTheFlyWorkout = false,
  checkCanSelectTile,
}) => {
  const [showHiddenArea, setShowHiddenArea] = useState(true);
  const {selectedExercise, setSelectedExercise} = useSelectedExercise();

  const createTile = (id: string) => (a: Activity, i: number) => {
    const isSelected =
      selectedExercise.groupId === id
      && selectedExercise.index === i;

    return (
      <ActivityTile
        disableDelete={!isOnTheFlyWorkout}
        selected={isSelected}
        showHiddenArea={isSelected && showHiddenArea}
        groupId={id}
        index={i}
        key={a.id}
        activity={a}
        handleSelect={() => {
          if (!isSelected) {
            checkCanSelectTile(() => {
              setSelectedExercise({ groupId: id, index: i });
            });
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
        shouldHideCompleted={isOnTheFlyWorkout}
      >
        <Ul>{tiles}</Ul>
      </ActivityListHeading>
    );
  });

  return (
    <>
      <Ul>{activityListTiles}</Ul>
      {isOnTheFlyWorkout &&
        <AddActivityTile setShowHiddenArea={setShowHiddenArea}/>
      }
      {startTime && // Only show the finish button if the workout has started.
        <FlexTile>
          <Button onClick={finishWorkoutClickHandler}>
            <ColouredDot fill={pink} />
            Finish Workout
          </Button>
        </FlexTile>
      }

      <BottomEmptySpace />
    </>
  );
};
