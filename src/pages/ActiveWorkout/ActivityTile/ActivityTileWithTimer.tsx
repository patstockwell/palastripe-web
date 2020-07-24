import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useAudio } from '../../../context/useAudio';
import HiddenTimerArea from './HiddenTimerArea';
import { ShowHiddenAreaArrowWrapper } from './ActivityTileWithReps';
import ToggleSetCompleteButton from './ToggleSetCompleteButton';
import StartTimedExerciseButton from './StartTimedExerciseButton';
import { tileStyle } from './ActivityTileSharedStyles';
import DownArrow from '../../../assets/svg/DownArrow';
import { TimedActivity } from '../../../helpers/types';
import {
  formatSeconds,
  scrollElementToTop,
  useHiddenAreaAnimation,
} from '../../../helpers/functions';
import {
  green,
  lightGrey3,
  timedExerciseWaitPeriod,
  tileMinHeight,
  activeWorkoutWindowHeight,
} from '../../../helpers/constants';
import {
  Details,
  Title,
  Duration,
  VisibleArea,
} from './index';
import { useActiveWorkout } from '../../../reducers/activeWorkoutReducer';

const Tile = styled.li<{ selected: boolean }>`
  ${tileStyle}
`;

const grow = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const colourPulse = keyframes`
  0% { background-color: ${lightGrey3}; }
  20% { background-color: darkgrey; }
  100% { background-color: ${lightGrey3}; }
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

interface Props {
  activity: TimedActivity;
  groupId: string;
  index: number;
  selected: boolean;
  showHiddenArea: boolean;
  toggleShowHiddenArea: () => void;
  handleSelect: () => void;
}

export const ActivityTileWithTimer: React.FC<Props> = ({
  activity: { name, timerInSeconds, completed, restPeriodInSeconds },
  handleSelect,
  selected,
  toggleShowHiddenArea,
  showHiddenArea,
  index,
  groupId,
}) => {
  const [count, setCount] = useState(0);
  const [preparationComplete, setPreparationComplete] = useState(false);
  const [finishedAnimating, setFinishedAnimating] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const { toggleSetComplete } = useActiveWorkout();
  const listElement = useRef(null);
  const { playStart, playComplete } = useAudio();
  const animatedStyles = useHiddenAreaAnimation({
    showHiddenArea,
    onRest: () => setFinishedAnimating(true),
    selected,
  });

  useEffect(() => {
    // `finishedAnimating` is initialised to false. When transitioning to a tile
    // and no animation happens (like when adding a tile during a custom
    // workout, or when selecting a tile with `showHiddenArea` set to false),
    // the `onRest` callback is not fired. In order to tell if the tile is ready
    // to be scrolled, we compare the animated and the expected heights.
    const height = selected && animatedStyles.height.getValue();
    const isOpen = showHiddenArea && height === activeWorkoutWindowHeight;
    const isClosed = !showHiddenArea && height === 0;

    if (selected && (finishedAnimating || isOpen || isClosed)) {
      // Only scroll after animation is at rest.
      scrollElementToTop(listElement);
    }

    if (!selected && finishedAnimating) {
      setFinishedAnimating(false);
    }
  }, [showHiddenArea, selected, finishedAnimating]);

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

  const handleClick = (completed?: boolean) => {
    if (selected) {
      toggleSetComplete({ groupId, index, completed });
    }
  };

  return (
    <Tile ref={listElement} selected={selected} onClick={handleSelect}>
      <VisibleArea>
        {inProgress && (preparationComplete ? (
          <ActiveTimerBar
            paused={paused}
            timer={timerInSeconds + 1} // add 1 to allow for the count to finish
            onAnimationEnd={() => {
              playComplete();
              handleClick(true);
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
        {started || completed ? (
          <ToggleSetCompleteButton
            selected={selected}
            restPeriodInSeconds={restPeriodInSeconds}
            handleClick={() => handleClick()}
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
    </Tile>
  );
};
