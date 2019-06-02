import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
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
  SelectionArea,
  SelectComplete,
} from './index';

const SeeMoreArrowWrapper = styled(animated.div)`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
`;

interface Props {
  activity: WeightedActivity;
  handleClick: any;
  selected: boolean;
  show: boolean;
}

const ActivityTile: React.FC<Props> = ({
  activity,
  show,
  handleClick,
  selected,
}) => {
  const animatedStyles = useSpring({
    height: show ? 300 : 0,
    opacity: show ? 1 : 0,
    x: show ? -180 : 0,
    config: { tension: 410, friction: 40 },
  });

  return (
    <Tile selected={selected} onClick={handleClick}>
      <VisibleArea>
        <Details>
          <Title>{activity.name}</Title>
          <SubTitle>Weight: {activity.weightInKilos}kg</SubTitle>
        </Details>
        <Duration>
          <p>{activity.repsGoal}</p>
        </Duration>
        <SelectionArea>
          <SelectComplete />
        </SelectionArea>
      </VisibleArea>

      <animated.div style={{
        height: animatedStyles.height,
        opacity: animatedStyles.opacity,
      }}>
        Hidden area!
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
  // the props handleClick and activity should never change
  // we only care about show and selected
  return prevProps.show === nextProps.show
    && prevProps.selected === nextProps.selected;
};

export default React.memo(ActivityTile, areEqual);
