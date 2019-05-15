import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import DownArrow from '../assets/svg/DownArrow';
import {
  isTimed,
  Activity, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  lightLightGrey,
  superLightGrey,
  tileMinHeight,
} from '../helpers/constants';
import { formatSeconds } from '../helpers/functions';

const Tile = styled.li`
  position: relative;
  color: ${({ selected }) => selected ? 'black' : '#444'};
  border: none;
  border-bottom: 1px solid ${lightLightGrey};
  background-color: ${({ selected }) => selected ? 'white' : superLightGrey};
`;

const Details = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 0 8px;
`;

const Name = styled.h3`
  font-size: 16px;
`;

const Weight = styled.p`
  color: grey;
`;

const Duration = styled.div`
  flex-basis: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 8px;
`;

const SeeMoreLineWrapper = styled(animated.div)`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
`;

const VisibleArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: flex-end;
  min-height: ${tileMinHeight}px;
`;

interface Props {
  activity: Activity;
  handleClick: any;
  selected: boolean;
  show: boolean;
}

const ActivityTile:React.FC<Props> = ({
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

  const duration = isTimed(activity)
    ? formatSeconds(activity.timerInSeconds)
    : activity.repsGoal;

  return (
    <Tile selected={selected} onClick={handleClick}>
      <VisibleArea>
        <Details>
          <Name>{activity.name}</Name>
          {!isTimed(activity) &&
            <Weight>Weight: {activity.weightInKilos}kg</Weight>
          }
        </Details>
        <Duration>
          <p>{duration}</p>
        </Duration>
      </VisibleArea>
      <animated.div style={{
        height: animatedStyles.height,
        opacity: animatedStyles.opacity,
      }}>
        Hidden area!
      </animated.div>
      {selected &&
        <SeeMoreLineWrapper
          style={{
            transform: animatedStyles.x.interpolate(x =>
              `translateX(-50%) rotate(${x}deg`)
          }}>
          <DownArrow style={{ fill: 'grey' }}/>
        </SeeMoreLineWrapper>
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
