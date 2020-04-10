import React, { memo, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { animated } from 'react-spring';
import styled from 'styled-components';
import {
  Dispatch, // eslint-disable-line no-unused-vars
} from 'redux';

import HiddenArea from './HiddenArea';
import ToggleSetCompleteButton from './ToggleSetCompleteButton';
import { tileStyle } from './ActivityTileSharedStyles';
import DownArrow from '../../../assets/svg/DownArrow';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  SingleSetAction, // eslint-disable-line no-unused-vars
  WeightedActivity, // eslint-disable-line no-unused-vars
} from '../../../helpers/types';
import {
  TOGGLE_SET_COMPLETE,
} from '../../../helpers/constants';
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

interface OwnProps {
  activity: WeightedActivity;
  groupId: string;
  toggleShowHiddenArea: () => void;
  handleSelect: () => void;
  index: number;
  selected: boolean;
  showHiddenArea: boolean;
}

type Props = DispatchProps & OwnProps & StateProps;

const ActivityTileWithReps: React.FC<Props> = ({
  activity,
  activity: {
    name, repsAchieved, weightInKilos, completed, restPeriodInSeconds,
  },
  groupId,
  index,
  handleSelect,
  toggleShowHiddenArea,
  selected,
  showHiddenArea,
  toggleSetComplete,
  useKilos,
}) => {
  const [ finishedAnimating, setFinishedAnimating ] = useState(false);
  const listElement = useRef<HTMLLIElement>(null);
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

  return (
    <Tile
      aria-expanded={showHiddenArea}
      selected={selected}
      onClick={() => handleSelect()}
      ref={listElement}
    >
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
            handleClick={toggleSetComplete}
            completed={completed}
          />
      </VisibleArea>

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

interface StateProps {
  useKilos: boolean;
}

interface DispatchProps {
  toggleSetComplete: () => ReduxAction<SingleSetAction>;
}

const mapStateToProps = (state: State): StateProps => ({
  useKilos: state.settings.useKilos,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ReduxAction<SingleSetAction>>,
  ownProps: Props
) => {
  const { selected, groupId, index } = ownProps;

  return {
    toggleSetComplete: (): ReduxAction<SingleSetAction> => dispatch({
      // only set the type correctly if this tile is selected
      type: selected && TOGGLE_SET_COMPLETE,
      payload: { groupId, index },
    }),
  };
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return !nextProps.selected && prevProps.selected === nextProps.selected;
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(memo(ActivityTileWithReps, areEqual));