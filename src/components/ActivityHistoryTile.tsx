import React from 'react';
import styled from 'styled-components';

import Dots from '../assets/svg/Dots';
import {
  getDiffInMinutes,
  formatDate,
  formatMinutes,
} from '../helpers/functions';
import {
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { opaqueImageInAfter } from './SharedStyles';
import { gutterWidth } from '../helpers/constants';

const Hr = styled.hr`
  border: none;
  height: 12px;
  background-color: lightgrey;
  margin: 0;
`;

const Image = styled.div<{ image: string }>`
  width: 100%;
  height: 300px;
  background-color: black;
  position: relative;
  z-index: -2;

  &::after {
    ${opaqueImageInAfter}
    opacity: 0.9; // override the opacity set in opaqueImageInAfter
  }
`;

const TileHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.p`
  padding: ${gutterWidth}px;
`;

const OptionsButton = styled.button`
  border: none;
  background: none;
  display: flex;
`;

interface Props {
  workout: Workout;
}

const ActivityHistoryTile: React.FC<Props> = ({ workout }) => {
  const { name, startTime, finishTime } = workout;
  const { day, date, month } = formatDate(finishTime);
  const totalTime = formatMinutes(getDiffInMinutes(startTime, finishTime));

  console.log(workout);

  return (
    <div>
      <TileHeader>
        <Name>{name}</Name>
        <OptionsButton>
          <Dots />
        </OptionsButton>
      </TileHeader>
      <Image image={workout.imageUrl} />
      <p>{`${day}, ${date} ${month}`}</p>
      <p>{totalTime}</p>
      <Hr />
    </div>
  );
};

export default ActivityHistoryTile;
