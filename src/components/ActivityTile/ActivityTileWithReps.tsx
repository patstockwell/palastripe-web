import React from 'react'; import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import HiddenArea from './HiddenArea';
import ToggleSetCompleteButton from './ToggleSetCompleteButton';
import DownArrow from '../../assets/svg/DownArrow';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  WeightedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { TOGGLE_SET_COMPLETE } from '../../helpers/constants';
import {
  Tile,
  Details,
  Title,
  SubTitle,
  Duration,
  VisibleArea,
} from './index';

const SeeMoreArrowWrapper = styled(animated.div)`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
`;

interface OwnProps {
  activity: WeightedActivity;
  group: string;
  handleOpen: any;
  handleSelect: any;
  index: number;
  selectable: boolean;
  selected: boolean;
  show: boolean;
}

interface DispatchProps {
  toggleSetComplete: () => ReduxAction;
}

type Props = DispatchProps & OwnProps;

const ActivityTileWithReps: React.FC<Props> = ({
  activity,
  group,
  index,
  handleSelect,
  handleOpen,
  selectable,
  selected,
  show,
  toggleSetComplete,
}) => {
  const animatedStyles = useSpring({
    height: show ? 300 : 0,
    opacity: show ? 1 : 0,
    x: show ? -180 : 0,
    config: { tension: 410, friction: 40 },
  });

  return (
    <Tile selected={selected} onClick={handleSelect}>
      <VisibleArea>
        <Details onClick={handleOpen}>
          <Title>{activity.name}</Title>
          <SubTitle>Weight: {activity.weightInKilos}kg</SubTitle>
        </Details>
        <Duration>
          <p>{activity.repsGoal}</p>
        </Duration>
        {selectable &&
          <ToggleSetCompleteButton
            toggleSetComplete={toggleSetComplete}
            completed={activity.completed}
          />
        }
      </VisibleArea>

      <animated.div style={{
        height: animatedStyles.height,
        opacity: animatedStyles.opacity,
      }}>
        <HiddenArea
          activity={activity}
          group={group}
          index={index}
        />
      </animated.div>

      {selected &&
        <SeeMoreArrowWrapper
          onClick={handleOpen}
          style={{
            transform: animatedStyles.x.interpolate(x =>
              `translateX(-50%) rotate(${x}deg`),
          }}>
          <DownArrow style={{ fill: 'grey' }}/>
        </SeeMoreArrowWrapper>
      }
    </Tile>
  );
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  const { selected, group, index } = ownProps;

  return {
    toggleSetComplete: (): ReduxAction => dispatch({
      // only set the type correctly if this tile is selected
      type: selected && TOGGLE_SET_COMPLETE,
      payload: { group, index },
    }),
  };
};

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(ActivityTileWithReps);
