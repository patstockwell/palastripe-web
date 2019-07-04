import React from 'react';
import styled from 'styled-components';
import {
  getDiffInMinutes,
  formatDate,
  formatMinutes,
} from '../helpers/functions';
import {
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: lightgrey;
`;

const Image = styled.div<{ url: string }>`
  width: 60px;
  height: 60px;
  background-size: cover;
  background-image: url(${({ url }) => url});
`;

interface Props {
  workout: Workout;
};

const ActivityHistoryTile: React.FC<Props> = ({ workout }) => {
  const { name, startTime, finishTime } = workout;
  const { day, date, month } = formatDate(finishTime);
  const totalTime = formatMinutes(getDiffInMinutes(startTime, finishTime));

  console.log(workout);

  return (
    <div>
      <Image url={workout.imageUrl} />
      <p>{name}</p>
      <p>{`${day}, ${date} ${month}`}</p>
      <p>{totalTime}</p>
      <Hr />
    </div>
  );
};

export default ActivityHistoryTile;
