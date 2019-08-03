import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import {
  Dispatch, // eslint-disable-line no-unused-vars
} from 'redux';

import HiddenArea from './HiddenArea';
import ToggleSetCompleteButton from './ToggleSetCompleteButton';
import EditActivityPanel from '../EditActivityPanel';
import { tileStyle } from './ActivityTileSharedStyles';
import DownArrow from '../../assets/svg/DownArrow';
import ForwardArrow from '../../assets/svg/ForwardArrow';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  SingleSetAction, // eslint-disable-line no-unused-vars
  WeightedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { TOGGLE_SET_COMPLETE } from '../../helpers/constants';
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

const ShowHiddenAreaArrowWrapper = styled(animated.button)`
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
  handleOpen: any;
  handleSelect: any;
  index: number;
  selected: boolean;
  showHiddenArea: boolean;
  editable: boolean;
}

type Props = DispatchProps & OwnProps;

const ActivityTileWithReps: React.FC<Props> = ({
  activity,
  activity: {
    name, repsAchieved, repsGoal, weightInKilos, completed,
  },
  groupId,
  index,
  handleSelect,
  handleOpen,
  selected,
  showHiddenArea,
  toggleSetComplete,
  editable,
}) => {
  const [showAnimation, setShowAnimation] = useState(false);

  const animatedStyles = useSpring({
    height: showHiddenArea ? 300 : 0,
    opacity: showHiddenArea ? 1 : 0,
    x: showHiddenArea ? -180 : 0,
    config: { tension: 410, friction: 40 },
  });

  return (
    <Tile
      aria-expanded={showHiddenArea}
      selected={selected}
      onClick={() => !editable && handleSelect()}
    >
      <VisibleArea>
        <Details onClick={handleOpen}>
          <Title>{name}</Title>
          <SubTitle>Weight: {weightInKilos}kg</SubTitle>
        </Details>
        <Duration>
          <p>{repsAchieved === undefined ? repsGoal : repsAchieved} x</p>
        </Duration>
        {editable ? (
          <ShowEditArrowWrapper onClick={() => setShowAnimation(true)}>
            <ForwardArrow style={{ fill: 'grey' }}/>
          </ShowEditArrowWrapper>
        ) : (
          <ToggleSetCompleteButton
            handleClick={toggleSetComplete}
            completed={completed}
          />
        )}
      </VisibleArea>

      <HiddenArea
        activity={activity}
        groupId={groupId}
        index={index}
        animatedStyles={animatedStyles}
      />

      {selected &&
        <ShowHiddenAreaArrowWrapper
          onClick={handleOpen}
          style={{
            transform: animatedStyles.x.interpolate(x =>
              `translateX(-50%) rotate(${x}deg`),
          }}>
          <DownArrow style={{ fill: 'grey' }}/>
        </ShowHiddenAreaArrowWrapper>
      }

      <EditActivityPanel
        show={showAnimation}
        activity={activity}
        groupId={groupId}
        index={index}
        hide={() => setShowAnimation(false)}
      />

    </Tile>
  );
};

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

interface DispatchProps {
  toggleSetComplete: () => ReduxAction<SingleSetAction>;
}

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(ActivityTileWithReps);
