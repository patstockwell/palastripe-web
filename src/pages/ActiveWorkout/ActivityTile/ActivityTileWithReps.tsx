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
    instanceId,
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
    if (selected && finishedAnimating) {
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
      <DraggableTileDelete disable={disableDelete} id={instanceId}>
        <VisibleArea>
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
