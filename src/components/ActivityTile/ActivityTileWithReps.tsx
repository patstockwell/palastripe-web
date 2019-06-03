import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import HiddenArea from './HiddenArea';
import ToggleSetCompleteButton from './ToggleSetCompleteButton';
import DownArrow from '../../assets/svg/DownArrow';
import {
  WeightedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
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

interface Props {
  activity: WeightedActivity;
  group: string;
  handleOpen: any;
  handleSelect: any;
  index: number;
  selectable: boolean;
  selected: boolean;
  show: boolean;
}

const ActivityTileWithReps: React.FC<Props> = ({
  activity,
  group,
  handleSelect,
  handleOpen,
  index,
  selectable,
  selected,
  show,
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
            selected={selected}
            group={group}
            index={index}
          />
        }
      </VisibleArea>

      <animated.div style={{
        height: animatedStyles.height,
        opacity: animatedStyles.opacity,
      }}>
        <HiddenArea activity={activity} />
      </animated.div>
      {selected &&
        <SeeMoreArrowWrapper
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

const areEqual = (prevProps, nextProps) => {
  // the props handleSelect and activity should never change
  // we only care about show and selected
  return prevProps.show === nextProps.show
    && prevProps.selected === nextProps.selected;
};

export default React.memo(ActivityTileWithReps, areEqual);
