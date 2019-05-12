import React from 'react';
import styled from 'styled-components';
import {
  isTimed,
  Activity, // eslint-disable-line no-unused-vars
  TimedActivity, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const Window = styled.div`
  height: ${({ height }) => height}px;
  border-bottom: 1px solid lightgrey;
  box-sizing: border-box;
  z-index: 2;
  background-color: white;
`;

const TimedActivityWindow = ({ activity }) => (
  <React.Fragment>
    <p>{activity.timerInSeconds}</p>
  </React.Fragment>
);

const WeightedActivityWindow = ({ activity }) => (
  <React.Fragment>
    <p>{activity.repsGoal}</p>
    <p>{activity.weightInKilos}</p>
  </React.Fragment>
);

interface Props {
  handleClick: () => void;
  height: number;
  workout: Workout;
  selected: {
    group: string;
    index: number;
  };
}

const ActiveWorkoutWindow: React.FC<Props> = ({
  handleClick,
  height,
  workout: {
    exercises,
    name: workoutName,
  },
  selected: {
    group,
    index,
  },
}) => {
  const activity: Activity = exercises[group][index];
  const { name } = activity;

  return (
    <Window height={height}>
      <button onClick={handleClick}>Toggle</button>
      <h1>{workoutName}</h1>
      <h2>{name}</h2>
      {isTimed(activity)
        ? <TimedActivityWindow activity={activity} />
        : <WeightedActivityWindow activity={activity} />
      }
    </Window>
  );
};

export default ActiveWorkoutWindow;
