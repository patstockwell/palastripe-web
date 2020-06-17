import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { animated } from 'react-spring';
import styled from 'styled-components';

import HiddenArea from './HiddenArea';
import ToggleSetCompleteButton from './ToggleSetCompleteButton';
import { tileStyle } from './ActivityTileSharedStyles';
import DownArrow from '../../../assets/svg/DownArrow';
import { WeightedActivity, State } from '../../../helpers/types';
import {
  scrollElementToTop,
  useHiddenAreaAnimation,
  formatWeight,
} from '../../../helpers/functions';
import {
  Details,
  Title,
  SubTitle,
  Duration,
  VisibleArea,
} from './index';
import { useActiveWorkout } from '../../../reducers/activeWorkoutReducer';
import { DraggableTileDelete } from './DraggableTileDelete';
import { activeWorkoutWindowHeight } from '../../../helpers/constants';

const Tile = styled.li<{ selected: boolean }>`
  ${tileStyle}
`;

export const ShowEditArrowWrapper = styled.div`
  order: 3;
  flex-basis: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ShowHiddenAreaArrowWrapper = styled(animated.button)`
  border: none;
  background: none;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

interface Props {
  activity: WeightedActivity;
  groupId: string;
  toggleShowHiddenArea: () => void;
  handleSelect: () => void;
  index: number;
  selected: boolean;
  showHiddenArea: boolean;
  disableDelete: boolean;
}

export const ActivityTileWithReps: React.FC<Props> = ({
  activity,
  activity: {
    name,
    repsAchieved,
    weightInKilos,
    completed,
    restPeriodInSeconds,
    id,
  },
  groupId,
  index,
  handleSelect,
  toggleShowHiddenArea,
  selected,
  showHiddenArea,
  disableDelete,
}) => {
  const [ finishedAnimating, setFinishedAnimating ] = useState(false);
  const listElement = useRef<HTMLLIElement>(null);
  const { toggleSetComplete } = useActiveWorkout();
  const useKilos = useSelector((state: State) => state.settings.useKilos);
  const animatedStyles = useHiddenAreaAnimation({
    showHiddenArea,
    onRest: () => setFinishedAnimating(true),
    selected,
  });

  useEffect(() => {
    // `finishedAnimating` is initialised to false. When transitioning to a tile
    // and no animation happens (like when adding a tile during a custom
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
  }, [showHiddenArea, selected, finishedAnimating]);

  const { label, weight } = formatWeight(weightInKilos, useKilos);
  const handleClick = () => {
    if (selected) {
      toggleSetComplete({ groupId, index });
    }
  };

  return (
    <Tile
      aria-expanded={showHiddenArea}
      selected={selected}
      onClick={() => handleSelect()}
      ref={listElement}
    >
      <DraggableTileDelete disable={disableDelete} id={id}>
        <VisibleArea selected={selected}>
          <Details onClick={toggleShowHiddenArea}>
            <Title>{name}</Title>
            <SubTitle>
              Weight: {weight} {label}
            </SubTitle>
          </Details>
          <Duration>
            <p>{repsAchieved} x</p>
          </Duration>
          <ToggleSetCompleteButton
            selected={selected}
            restPeriodInSeconds={restPeriodInSeconds}
            handleClick={handleClick}
            completed={completed}
          />
        </VisibleArea>
      </DraggableTileDelete>

      <HiddenArea
        activity={activity}
        groupId={groupId}
        index={index}
        animatedStyles={animatedStyles}
        toggleShowHiddenArea={toggleShowHiddenArea}
      />

      {selected &&
        <ShowHiddenAreaArrowWrapper
          onClick={toggleShowHiddenArea}
          style={{
            transform: animatedStyles.x.interpolate(x =>
              `translateX(-50%) rotate(${x}deg`),
          }}>
          <DownArrow style={{ fill: 'lightgrey' }}/>
        </ShowHiddenAreaArrowWrapper>
      }
    </Tile>
  );
};
