import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  TimedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { formatSeconds } from '../../helpers/functions';
import { green, timedExerciseWaitPeriod } from '../../helpers/constants';
import {
  Tile,
  Details,
  Title,
  Duration,
  VisibleArea,
} from './index';

const grow = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const PreparationTimer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: lightgrey;
  animation: ${grow} ${timedExerciseWaitPeriod}s linear;
`;

const ActiveTimer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${green};
  animation: ${grow} 60s linear;
`;

interface Props {
  activity: TimedActivity;
  handleClick: any;
  selected: boolean;
}

const ActivityTile:React.FC<Props> = ({
  activity,
  handleClick,
  selected,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (selected) {
      const id = setInterval(() => setCount(count + 1), 1000);
      return () => clearInterval(id);
    } else {
      // reset count when not selected
      setCount(0);
    }
  });

  return (
    <Tile selected={selected} onClick={handleClick}>
      {selected && (count < timedExerciseWaitPeriod
        ? <PreparationTimer />
        : <ActiveTimer />
      )}
      <VisibleArea>
        <Details>
          <Title>{activity.name}</Title>
        </Details>
        <Duration>
          <p>{formatSeconds(activity.timerInSeconds)}</p>
        </Duration>
      </VisibleArea>
    </Tile>
  );
};

const areEqual = (prevProps, nextProps) => {
  // the props handleClick and activity should never change
  // we only care about show and selected
  return prevProps.show === nextProps.show
    && prevProps.selected === nextProps.selected;
};

export default React.memo(ActivityTile, areEqual);
