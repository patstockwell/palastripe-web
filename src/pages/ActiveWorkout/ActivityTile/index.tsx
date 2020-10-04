import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import {SpringValue} from 'react-spring';

import {RestTimer} from '../RestTimer';
import {isTimed} from '../../../helpers/types';
import {ActivityTileWithReps} from './ActivityTileWithReps';
import {ActivityTileWithTimer} from './ActivityTileWithTimer';
import {Activity} from '../../../helpers/types';
import {
  tileMinHeight,
  lightGrey3,
  activeWorkoutWindowHeight,
  gutterWidth,
} from '../../../helpers/constants';
import {useSelectedExercise} from '../../../context/useSelectedExercise';
import {useRestTimer} from '../../../context/useRestTimer';
import {
  scrollElementToTop,
  useHiddenAreaAnimation,
} from '../../../helpers/functions';

export const Details = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  order: 2;
  flex-grow: 1;
  overflow: hidden;
`;

export const Title = styled.h3`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  line-height: 1.3;
  margin: 0;
`;

export const SubTitle = styled.p`
  color: grey;
  margin: 0;
`;

export const Duration = styled.div`
  flex-basis: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 4px;
  order: 1;
`;

export const VisibleArea = styled.div<{ selected?: boolean }>`
  position: relative;
  display: flex;
  align-items: stretch;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 ${gutterWidth}px;
  min-height: ${tileMinHeight}px;
  background-color: ${props => {
    if (props.selected === undefined) {
      return 'transparent';
    }
    return props.selected ? 'white' : lightGrey3;
  }};
  z-index: 1;
`;

interface Props {
  activity: Activity;
  groupId: string;
  index: number;
  handleSelect?: () => void;
  toggleShowHiddenArea?: () => void;
  selected?: boolean;
  showHiddenArea?: boolean;
  disableDelete: boolean;
}

export const ActivityTile: React.FC<Props> = ({
  activity,
  groupId,
  index,
  handleSelect,
  toggleShowHiddenArea,
  selected,
  showHiddenArea,
  disableDelete,
}) => {
  const [finishedAnimating, setFinishedAnimating] = useState(false);
  const {selectNextExercise} = useSelectedExercise();
  const {
    activeRestTimer,
    setActiveRestTimer,
    clearRestTimer,
    count,
  } = useRestTimer();
  const listElement = useRef<HTMLLIElement>(null);

  const animatedStyles: {[x: string]: SpringValue<any>} = useHiddenAreaAnimation({
    showHiddenArea,
    onRest: () => setFinishedAnimating(true),
    selected,
  });

  useEffect(() => {
    // `finishedAnimating` is initialised to false. When transitioning to a tile
    // and no animation happens (like when adding a tile during a onTheFly
    // workout, or when selecting a tile with `showHiddenArea` set to false),
    // the `onRest` callback is not fired. In order to tell if the tile is ready
    // to be scrolled, we compare the animated and the expected heights.
    const height = selected && animatedStyles.height.getValue();
    const isOpen = showHiddenArea && height === activeWorkoutWindowHeight;
    const isClosed = !showHiddenArea && height === 0;

    if (selected && (finishedAnimating || isOpen || isClosed)) {
      // Only scroll after animation is at rest.
      scrollElementToTop(listElement);
    }

    if (!selected && finishedAnimating) {
      setFinishedAnimating(false);
    }
  }, [animatedStyles.height, showHiddenArea, selected, finishedAnimating]);

  const onSetComplete = () => {
    if (selected) {
      setActiveRestTimer({ groupId, index });
      selectNextExercise();
    }
  };

  const showTheRestTimer =
    activeRestTimer.groupId === groupId
    && activeRestTimer.index === index
    && activity.completed;

  return (
    <>
      {isTimed(activity)
        ? (
          <ActivityTileWithTimer
            selected={selected}
            showHiddenArea={showHiddenArea}
            groupId={groupId}
            index={index}
            activity={activity}
            handleSelect={handleSelect}
            toggleShowHiddenArea={toggleShowHiddenArea}
            onSetComplete={onSetComplete}
            listElement={listElement}
            animatedStyles={animatedStyles}
          />
        ) : (
          <ActivityTileWithReps
            selected={selected}
            showHiddenArea={showHiddenArea}
            groupId={groupId}
            index={index}
            activity={activity}
            handleSelect={handleSelect}
            toggleShowHiddenArea={toggleShowHiddenArea}
            disableDelete={disableDelete}
            onSetComplete={onSetComplete}
            listElement={listElement}
            animatedStyles={animatedStyles}
          />
        )
      }

      {showTheRestTimer && (
        <RestTimer
          count={count}
          restPeriod={activity.restPeriodInSeconds}
          handleClick={clearRestTimer}
        />
      )}
    </>
  );
};
