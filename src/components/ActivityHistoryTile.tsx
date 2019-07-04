import React from 'react';
import styled from 'styled-components';
import {
  getDiffInMinutes,
  formatDate,
  formatMinutes,
} from '../helpers/functions';

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: lightgrey;
`;

const ActivityHistoryTile = ({ workout }) => {
    const { name, startTime, finishTime } = workout;
    const { day, date, month } = formatDate(finishTime);
    const workoutLength = formatMinutes(getDiffInMinutes(startTime, finishTime));

  return (
    <div>
      <p>{name}</p>
      <p>{`${day}, ${date} ${month}`}</p>
      <p>{workoutLength}</p>
      <Hr />
    </div>
  );
};

export default ActivityHistoryTile;
