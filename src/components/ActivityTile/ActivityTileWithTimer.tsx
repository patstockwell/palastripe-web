import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import ToggleSetCompleteButton from './ToggleSetCompleteButton';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  TimedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { formatSeconds } from '../../helpers/functions';
import {
  green,
  timedExerciseWaitPeriod,
  TOGGLE_SET_COMPLETE,
} from '../../helpers/constants';
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
  background-color: ${green};
  animation: ${grow} ${({timer}) => timer}s linear;
`;

interface Props {
  activity: TimedActivity;
  group: string;
  index: number;
  handleSelect: any;
  selectable: boolean;
  selected: boolean;
  toggleSetComplete?: (completed?: boolean) => ReduxAction;
}

const ActivityTileWithTimer: React.FC<Props> = ({
  activity: {
    name,
    timerInSeconds,
    completed,
  },
  selectable,
  handleSelect,
  selected,
  toggleSetComplete,
}) => {
  const [count, setCount] = useState(0);

  const totalExerciseTime = timedExerciseWaitPeriod + timerInSeconds;

  useEffect(() => {
    if (selected && !completed && count < totalExerciseTime) {
      // if we're below the count threshold, keep counting
      const id = setInterval(() => setCount(count + 1), 1000);
      return () => clearInterval(id);
    } else if (selected && !completed && count >= totalExerciseTime) {
      // if we're above the count threshold, toggle the 'completed' button
      toggleSetComplete(true);
    } else if (completed) {
      return; // do nothing
    } else {
      setCount(0); // else if not selected and not complete, reset counter
    }
  });

  return (
    <Tile selected={selected} onClick={handleSelect}>
      {selected && !completed && (count < timedExerciseWaitPeriod
        ? <PreparationTimer />
        : <ActiveTimer timer={timerInSeconds} />
      )}
      <VisibleArea>
        <Details>
          <Title>{name}</Title>
        </Details>
        <Duration>
          <p>{formatSeconds(timerInSeconds)}</p>
        </Duration>
        {selectable &&
          <ToggleSetCompleteButton
            toggleSetComplete={() => toggleSetComplete()}
            completed={completed}
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
    && prevProps.selected === nextProps.selected
    && prevProps.activity.completed === nextProps.activity.completed;
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  const { selected, group, index } = ownProps;

  return {
    toggleSetComplete: (completed?: boolean): ReduxAction => dispatch({
      // only set the action type correctly if this tile is selected
      type: selected && TOGGLE_SET_COMPLETE,
      payload: { completed, group, index },
    }),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(React.memo(ActivityTileWithTimer, areEqual));
