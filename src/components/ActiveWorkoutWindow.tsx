import React from 'react';
import styled from 'styled-components';
import { activeWorkoutWindowHeight } from '../helpers/constants';
import {
  isTimed,
  Activity, // eslint-disable-line no-unused-vars
  TimedActivity, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const Window = styled.div`
  position: sticky;
  top: 0;
  height: ${activeWorkoutWindowHeight}px;
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
  workout: Workout;
  selected: {
    group: string;
    index: number;
  };
}

const ActiveWorkoutWindow: React.FC<Props> = ({
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
  console.log(activity);
  return (
    <Window>
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
