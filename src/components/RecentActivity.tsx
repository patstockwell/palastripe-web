import React from 'react';
import { connect } from 'react-redux';
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

interface StateProps {
  history: Workout[],
}

const RecentActivity: React.FC<StateProps> = ({ history }) => {
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
      <h2>Activity</h2>
      <Hr />
      {historyTiles}
      {!historyTiles.length && <div>Your workout history will appear here</div>}
    </Section>
  );
};

const mapStateToProps = state => ({
  history: state.history,
});

export default connect<void, StateProps, void>(
  mapStateToProps,
  null
)(RecentActivity);
