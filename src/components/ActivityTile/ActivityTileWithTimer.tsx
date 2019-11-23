import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { useAudio } from '../../context/audio';
import { usePageRef } from '../../context/pageRef';
import HiddenTimerArea from './HiddenTimerArea';
import EditActivityPanel from '../EditActivityPanel';
import { ShowHiddenAreaArrowWrapper } from './ActivityTileWithReps';
import ToggleSetCompleteButton from './ToggleSetCompleteButton';
import { ShowEditArrowWrapper } from './ActivityTileWithReps';
import ForwardArrow from '../../assets/svg/ForwardArrow';
import StartTimedExerciseButton from './StartTimedExerciseButton';
import { tileStyle } from './ActivityTileSharedStyles';
import DownArrow from '../../assets/svg/DownArrow';
import {
  Dispatch, // eslint-disable-line no-unused-vars
} from 'redux';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  SingleSetAction, // eslint-disable-line no-unused-vars
  TimedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import {
  formatSeconds,
  useScrollElementToTop,
  useHiddenAreaAnimation,
} from '../../helpers/functions';
import {
  green,
  superLightGrey,
  timedExerciseWaitPeriod,
  TOGGLE_SET_COMPLETE,
  tileMinHeight,
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

const timerStyle = `
  position: absolute;
  height: ${tileMinHeight / 2}px;
  bottom: calc(5px - ${tileMinHeight / 2}px);
  left: 0;
`;

const PreparationTimerBar = styled.div<{ paused: boolean }>`
  ${timerStyle}
  background-color: lightgrey;
  animation:
    ${grow} ${timedExerciseWaitPeriod}s linear,
    ${colourPulse} 2s linear infinite;
  animation-play-state: ${({ paused }) => paused ? 'paused' : 'running'};
`;

const ActiveTimerBar = styled.div<{ timer: number, paused: boolean }>`
  ${timerStyle}
  background-color: ${green};
  animation: ${grow} ${({timer}) => timer}s linear;
  animation-play-state: ${({ paused }) => paused ? 'paused' : 'running'};
`;

interface OwnProps {
  activity: TimedActivity;
  groupId: string;
  index: number;
  selected: boolean;
  editable: boolean;
  showHiddenArea: boolean;
  toggleShowHiddenArea: () => void;
  handleSelect: () => void;
}

type Props = OwnProps & DispatchProps;

const ActivityTileWithTimer: React.FC<Props> = ({
  activity,
  activity: { name, timerInSeconds, completed, restPeriodInSeconds },
  groupId,
  index,
  handleSelect,
  selected,
  toggleShowHiddenArea,
  showHiddenArea,
  toggleSetComplete,
  editable,
}) => {
  const [count, setCount] = useState(0);
  const [preparationComplete, setPreparationComplete] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [ finishedAnimating, setFinishedAnimating ] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const listElement = useRef(null);
  const pageRef = usePageRef();
  const { playStart, playComplete } = useAudio();
  const animatedStyles = useHiddenAreaAnimation({
    showHiddenArea,
    onRest: () => setFinishedAnimating(true),
    selected,
  });

  useScrollElementToTop({
    page: pageRef,
    li: listElement,
    shouldScroll: selected && finishedAnimating,
    show: showHiddenArea,
  });

  const inProgress = selected && !completed && started;

  useEffect(() => {
    if (inProgress && preparationComplete && !paused) { // keep counting
      const id = setInterval(() => setCount(count + 1), 1000);
      return () => clearInterval(id);
    }

    if (!selected && completed || !selected && started) { // reset
      setPreparationComplete(false);
      setCount(0);
      setStarted(false);
      setPaused(false);
    }
  });

  const formattedTime: string = formatSeconds(timerInSeconds - count);

  return (
    <Tile ref={listElement} selected={selected} onClick={handleSelect}>
      <VisibleArea>

        {inProgress && (preparationComplete ? (
          <ActiveTimerBar
            paused={paused}
            timer={timerInSeconds + 1} // add 1 to allow for the count to finish
            onAnimationEnd={() => {
              playComplete();
              toggleSetComplete(true);
            }}
          />
        ) : (
          <PreparationTimerBar
            paused={paused}
            onAnimationEnd={() => {
              setPreparationComplete(true);
              playStart();
            }}
          />
        ))}

        <Details onClick={toggleShowHiddenArea}>
          <Title>{name}</Title>
        </Details>
        <Duration>
          <p>{formattedTime}</p>
        </Duration>
        {editable &&
          <ShowEditArrowWrapper onClick={() => setShowEditPanel(true)}>
            <ForwardArrow style={{ fill: 'grey' }}/>
          </ShowEditArrowWrapper>
        }

        {!editable && (started || completed) ? (
          <ToggleSetCompleteButton
            selected={selected}
            restPeriodInSeconds={restPeriodInSeconds}
            handleClick={() => toggleSetComplete()}
            completed={completed}
          />
        ) : (
          <StartTimedExerciseButton
            handleClick={() => selected && setStarted(true)}
            showIcon={selected}
          />
        )}
      </VisibleArea>

      <HiddenTimerArea
        completed={completed}
        time={formattedTime}
        animatedStyles={animatedStyles}
        preparing={inProgress && !preparationComplete}
        started={started}
        paused={paused}
        handleButtonClick={() => {
          !started ? setStarted(true) : setPaused(!paused);
        }}
      />

      {selected &&
        <ShowHiddenAreaArrowWrapper
          onClick={toggleShowHiddenArea}
          style={{
            transform: animatedStyles.x.interpolate(x =>
              `translateX(-50%) rotate(${x}deg`),
          }}>
          <DownArrow style={{ fill: 'lightgrey' }}/>
        </ShowHiddenAreaArrowWrapper>
      }

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
  return prevProps.selected === nextProps.selected && !nextProps.selected;
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
