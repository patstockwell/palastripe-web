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
  padding: ${gutterWidth}px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Name = styled.p`
`;

const FinishTimeAndDay = styled.p`
  color: grey;
  font-size: 12px;
`;

const OptionsButton = styled.button`
  border: none;
  background: none;
  display: flex;
  padding: 0;
`;

interface Props {
  workout: Workout;
}

const ActivityHistoryTile: React.FC<Props> = ({ workout }) => {
  const { name, startTime, finishTime } = workout;
  const { historyTileDateFormat } = formatDate(finishTime);
  const totalTime = formatMinutes(getDiffInMinutes(startTime, finishTime));

  console.log(workout);

  return (
    <div>
      <TileHeader>
        <div>
          <Name>{name}</Name>
          <FinishTimeAndDay>{historyTileDateFormat}</FinishTimeAndDay>
        </div>
        <OptionsButton>
          <Dots />
        </OptionsButton>
      </TileHeader>
      <Image image={workout.imageUrl} />
      <p>{totalTime}</p>
      <Hr />
    </div>
  );
};

export default ActivityHistoryTile;
