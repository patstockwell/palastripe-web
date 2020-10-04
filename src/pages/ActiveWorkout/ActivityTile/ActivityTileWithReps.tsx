import React from 'react';
import { useSelector } from 'react-redux';
import { animated, SpringValue } from '@react-spring/web';
import styled from 'styled-components';

import { HiddenArea } from './HiddenArea';
import { ToggleSetCompleteButton } from './ToggleSetCompleteButton';
import { tileStyle } from './ActivityTileSharedStyles';
import DownArrow from '../../../assets/svg/DownArrow';
import { WeightedActivity, State } from '../../../helpers/types';
import { formatWeight } from '../../../helpers/functions';
import { Details, Title, SubTitle, VisibleArea } from './index';
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
  onSetComplete: () => void;
  listElement: React.MutableRefObject<HTMLLIElement>;
  animatedStyles: { [x: string]: SpringValue<any>; };
}

export const ActivityTileWithReps: React.FC<Props> = ({
  activity,
  activity: {
    name,
    repsAchieved,
    weightInKilos,
    completed,
    id,
  },
  groupId,
  index,
  handleSelect,
  toggleShowHiddenArea,
  selected,
  showHiddenArea,
  disableDelete,
  onSetComplete,
  listElement,
  animatedStyles,
}) => {
  const { toggleSetComplete } = useActiveWorkout();
  const useKilos = useSelector((state: State) => state.settings.useKilos);
  const { label, weight } = formatWeight(weightInKilos, useKilos);

  const handleClick = () => {
    if (selected) {
      toggleSetComplete({ groupId, index });
    }
  };

  return (
    <>
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
                {repsAchieved} x {weight} {label}
              </SubTitle>
            </Details>
            <ToggleSetCompleteButton
              onAnimationEnd={onSetComplete}
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
    </>
  );
};
