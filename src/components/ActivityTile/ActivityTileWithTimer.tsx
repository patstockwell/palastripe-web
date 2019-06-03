import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ToggleSetCompleteButton from './ToggleSetCompleteButton';
import {
  TimedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { formatSeconds } from '../../helpers/functions';
import { purple, timedExerciseWaitPeriod } from '../../helpers/constants';
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
  top: 90%;
  bottom: 0;
  left: 0;
  background-color: lightgrey;
  animation: ${grow} ${timedExerciseWaitPeriod}s linear;
`;

const ActiveTimer = styled.div`
  position: absolute;
  top: 90%;
  bottom: 0;
  left: 0;
  background-color: ${purple};
  animation: ${grow} 60s linear;
`;

interface Props {
  activity: TimedActivity;
  group: string;
  index: number;
  handleSelect: any;
  selectable: boolean;
  selected: boolean;
}

const ActivityTileWithTimer: React.FC<Props> = ({
  activity,
  group,
  index,
  selectable,
  handleSelect,
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
    <Tile selected={selected} onClick={handleSelect}>
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
        {selectable &&
          <ToggleSetCompleteButton
            selected={selected}
            group={group}
            index={index}
          />
        }
      </VisibleArea>
    </Tile>
  );
};

const areEqual = (prevProps, nextProps) => {
  // the props handleSelect and activity should never change
  // we only care about show and selected
  return prevProps.show === nextProps.show
    && prevProps.selected === nextProps.selected;
};

export default React.memo(ActivityTileWithTimer, areEqual);
