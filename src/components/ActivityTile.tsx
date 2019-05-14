import React from 'react';
import styled from 'styled-components';
import Line from '../assets/svg/Line';
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
  min-height: ${tileMinHeight}px;
  color: ${({ selected }) => selected ? 'black' : '#444'};
  border: none;
  border-bottom: 1px solid ${lightLightGrey};
  background-color: ${({ selected }) => selected ? 'white' : superLightGrey};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: flex-end;
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

const SeeMoreLineWrapper = styled.div`
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
`;

interface Props {
  activity: Activity;
  handleClick: any;
  selected?: boolean;
}

const ActivityTile:React.FC<Props> = ({
  activity,
  handleClick,
  selected,
}) => {
  const duration = isTimed(activity)
    ? formatSeconds(activity.timerInSeconds)
    : activity.repsGoal;

  return (
    <Tile selected={selected} onClick={handleClick}>
      <Details>
        <Name>{activity.name}</Name>
        {!isTimed(activity) &&
          <Weight>Weight: {activity.weightInKilos}kg</Weight>
        }
      </Details>
      <Duration>
        <p>{duration}</p>
      </Duration>
      {selected &&
        <SeeMoreLineWrapper>
          <Line style={{ fill: 'grey' }}/>
        </SeeMoreLineWrapper>
      }
    </Tile>
  );
};

export default ActivityTile;
