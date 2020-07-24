import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { State } from '../../helpers/types';
import { Workout } from '../../reducers/workoutsReducer';
import { MONTHS_OF_THE_YEAR, purple, lightGrey2 } from '../../helpers/constants';

const Grid = styled.div`
  margin: 0 auto 24px;
  width: 276px;
  padding: 0 12px;
  max-width: 100%;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const blockStyle = `
  display: block;
  height: 10px;
  width: 10px;
  font-size: 10px;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 0;
  margin: 2px;
`;

const EmptyBlock = styled.div`
  ${blockStyle}
  border: 2px solid lightgrey;
`;

const Month = styled.div`
  ${blockStyle}

  font-size: 10px;
  color: grey;
  margin-bottom: 4px;
`;

const Block = styled.div<{ highlight: boolean; evenMonth: boolean }>`
  ${blockStyle}

  color: transparent;
  // first give the default background-color rule.
  background-color: ${props => props.evenMonth ? lightGrey2 : 'lightgrey'};
  // then highlight workouts in purple.
  ${props => props.highlight && `background-color: ${purple};`}
  ${props => props.highlight && 'opacity: 0.7;'}
`;

export const CalendarGraph: React.FC = () => {
  const activityHistory = useSelector((state: State) => state.history);
  const iterator = new Date();
  const daysInAWeek = 7;
  const weeksToDisplay = 18;
  const daysUntilEndOfThisWeek = 6 - iterator.getDay();
  const daysToDisplay = (daysInAWeek * weeksToDisplay) - daysUntilEndOfThisWeek;
  interface WorkoutDate extends Date {
    workoutCompleted: boolean;
  }
  const dates: Array<Array<WorkoutDate>> = [
    [], // sundays
    [], // mondays
    [], // tuesdays
    [], // wednesdays
    [], // thursdays
    [], // fridays
    [], // saturdays
  ];

  const existingWorkoutsDateHash: { [key: string]: Workout } = activityHistory.reduce((acc, curr) => {
    const date = new Date(curr.finishTime);
    return {
      ...acc,
      [date.toDateString()]: curr,
    };
  }, {});

  // add extra days just for the current week
  for (let x = 0; x < daysToDisplay; x++) {
    dates[iterator.getDay()].unshift(new Date(iterator) as WorkoutDate);
    // see if a workout exists for this date
    if (existingWorkoutsDateHash[iterator.toDateString()]) {
      dates[iterator.getDay()][0].workoutCompleted = true;
    }
    iterator.setDate(iterator.getDate() - 1);
  }

  return (
    <Grid>
      {dates.map(weekday => (
        <Row key={weekday[0].toDateString()}>
          {weekday.map(date => (
            <Block
              highlight={date.workoutCompleted}
              key={date.toDateString()}
              evenMonth={date.getMonth() % 2 === 0}
            >
              {date.getDate()}
            </Block>
          ))}
          {weekday.length < weeksToDisplay && <EmptyBlock />}
        </Row>
      ))}
      <Row className="month">
        {dates[6].map((date, i) => (
          // iterate over the last day of each week to find the month name
          <Month key={date.toDateString()}>
            {i !== 0 && date.getMonth() > dates[6][i - 1].getMonth()
              // only display label on first week of the month
              ? MONTHS_OF_THE_YEAR[date.getMonth()].slice(0, 3)
              : null
            }
          </Month>
        ))}
      </Row>
    </Grid>
  );
};
