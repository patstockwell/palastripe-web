import React from 'react';
import styled from 'styled-components';
import { gutterWidth } from '../helpers/constants';
import {
  getDiffInMinutes,
  formatDate,
  formatMinutes,
} from '../helpers/functions';
import {
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const Section = styled.section`
  padding: ${gutterWidth}px;
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: lightgrey;
`;

interface Props {
  history: Workout[];
}

const ActivityHistory: React.FC<Props> = ({ history }) => {
  const historyTiles = history.map(workout => {
    const { name, startTime, finishTime } = workout;
    const { day, date, month } = formatDate(finishTime);
    const workoutLength = formatMinutes(getDiffInMinutes(startTime, finishTime));

    return (
      <div key={startTime}>
        <p>{name}</p>
        <p>{`${day}, ${date} ${month}`}</p>
        <p>{workoutLength}</p>
        <Hr />
      </div>
    );
  });

  return (
    <Section>
      {historyTiles}
      {!historyTiles.length && <div>Your workout history will appear here</div>}
    </Section>
  );
};

export default ActivityHistory;
