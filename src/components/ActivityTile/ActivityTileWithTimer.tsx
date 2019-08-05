import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import EditActivityPanel from '../EditActivityPanel';
import ToggleSetCompleteButton from './ToggleSetCompleteButton';
import { ShowEditArrowWrapper } from './ActivityTileWithReps';
import ForwardArrow from '../../assets/svg/ForwardArrow';
import StartTimedExerciseButton from './StartTimedExerciseButton';
import { tileStyle } from './ActivityTileSharedStyles';
import {
  Dispatch, // eslint-disable-line no-unused-vars
} from 'redux';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  SingleSetAction, // eslint-disable-line no-unused-vars
  TimedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { formatSeconds } from '../../helpers/functions';
import {
  green,
  superLightGrey,
  timedExerciseWaitPeriod,
  TOGGLE_SET_COMPLETE,
} from '../../helpers/constants';
import {
  Details,
  Title,
  Duration,
  VisibleArea,
} from './index';

const Tile = styled.li`
  ${tileStyle}
`;

const grow = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const colourPulse = keyframes`
  0% { background-color: ${superLightGrey}; }
  20% { background-color: darkgrey; }
  100% { background-color: ${superLightGrey}; }
`;

const PreparationTimer = styled.div`
  position: absolute;
  top: 80%;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: lightgrey;
  animation:
    ${grow} ${timedExerciseWaitPeriod}s linear,
    ${colourPulse} 2s linear infinite;
`;

const ActiveTimer = styled.div<{ timer: number }>`
  position: absolute;
  top: 80%;
  bottom: 0;
  left: 0;
  background-color: ${green};
  animation: ${grow} ${({timer}) => timer}s linear;
`;

interface OwnProps {
  activity: TimedActivity;
  groupId: string;
  index: number;
  handleSelect: any;
  selected: boolean;
  editable: boolean;
}

type Props = OwnProps & DispatchProps;

const ActivityTileWithTimer: React.FC<Props> = ({
  activity,
  activity: { name, timerInSeconds, completed },
  groupId,
  index,
  handleSelect,
  selected,
  toggleSetComplete,
  editable,
}) => {
  const [count, setCount] = useState(0);
  const [preparationComplete, setPreparationComplete] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [started, setStarted] = useState(false);

  const inProgress = selected && !completed && started;

  useEffect(() => {
    if (inProgress && preparationComplete) { // keep counting
      const id = setInterval(() => setCount(count + 1), 1000);
      return () => clearInterval(id);
    } else { // reset
      setPreparationComplete(false);
      setCount(0);
    }
  });

  if (!selected && started) { // if another tile is selected, reset this one
    setStarted(false);
  }

  return (
    <Tile selected={selected} onClick={handleSelect}>

      {inProgress && (preparationComplete ? (
        <ActiveTimer
          timer={timerInSeconds + 1} // add 1 to allow for the count to finish
          onAnimationEnd={() => toggleSetComplete(true)}
        />
      ) : (
        <PreparationTimer
          onAnimationEnd={() => setPreparationComplete(true)}
        />
      ))}

      <VisibleArea>
        <Details>
          <Title>{name}</Title>
        </Details>
        <Duration>
          <p>{formatSeconds(timerInSeconds - count)}</p>
        </Duration>
        {editable &&
          <ShowEditArrowWrapper onClick={() => setShowEditPanel(true)}>
            <ForwardArrow style={{ fill: 'grey' }}/>
          </ShowEditArrowWrapper>
        }

        {!editable && (started || completed) ? (
          <ToggleSetCompleteButton
            handleClick={toggleSetComplete}
            completed={completed}
            timerIsRunning={started}
          />
        ) : (
          <StartTimedExerciseButton
            handleClick={() => selected && setStarted(true)}
            showIcon={selected}
          />
        )}
      </VisibleArea>

      <EditActivityPanel
        show={showEditPanel}
        activity={activity}
        groupId={groupId}
        index={index}
        hide={() => setShowEditPanel(false)}
      />

    </Tile>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  // the props handleSelect and activity should never change
  // we only care about selected
  return prevProps.selected === nextProps.selected
    && prevProps.activity.completed === nextProps.activity.completed;
};

type ToggleSetAction = ReduxAction<SingleSetAction & { completed: boolean }>;

const mapDispatchToProps = (
  dispatch: Dispatch<ToggleSetAction>,
  ownProps: OwnProps
): DispatchProps => {
  const { selected, groupId, index } = ownProps;

  return {
    toggleSetComplete: completed => dispatch({
      // only set the action type correctly if this tile is selected
      type: selected && TOGGLE_SET_COMPLETE,
      payload: { completed, groupId, index },
    }),
  };
};

interface DispatchProps {
  toggleSetComplete: (completed?: boolean) => ToggleSetAction;
}

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(React.memo(ActivityTileWithTimer, areEqual));
