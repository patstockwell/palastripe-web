import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {SpringValue} from 'react-spring';

import {useAudio} from '../../../context/useAudio';
import {useRestTimer} from '../../../context/useRestTimer';
import HiddenTimerArea from './HiddenTimerArea';
import {ShowHiddenAreaArrowWrapper} from './ActivityTileWithReps';
import {ToggleSetCompleteButton} from './ToggleSetCompleteButton';
import {StartTimedExerciseButton} from './StartTimedExerciseButton';
import {tileStyle} from './ActivityTileSharedStyles';
import DownArrow from '../../../assets/svg/DownArrow';
import {TimedActivity} from '../../../helpers/types';
import {formatSeconds, useInterval} from '../../../helpers/functions';
import {
  green,
  lightGrey3,
  timedExerciseWaitPeriod,
  tileMinHeight,
  ONE_SECOND,
} from '../../../helpers/constants';
import {Details, Title, VisibleArea, SubTitle} from './index';
import {useActiveWorkout} from '../../../reducers/activeWorkoutReducer';

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
  onSetComplete: () => void;
  animatedStyles: { [x: string]: SpringValue<any>; };
  listElement: React.MutableRefObject<HTMLLIElement>;
}

export const ActivityTileWithTimer: React.FC<Props> = ({
  activity: {name, timerInSeconds, completed},
  handleSelect,
  selected,
  toggleShowHiddenArea,
  showHiddenArea,
  index,
  groupId,
  onSetComplete,
  animatedStyles,
  listElement,
}) => {
  const [count, setCount] = useState(0);
  const [preparationComplete, setPreparationComplete] = useState(false);
  const [preparationStarted, setPreparationStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const {toggleSetComplete} = useActiveWorkout();
  const {playStart, playComplete} = useAudio();
  const {setActiveRestTimer} = useRestTimer();

  const inProgress = selected && !completed && preparationStarted;

  const shouldUseInterval = inProgress && preparationComplete && !paused;
  useInterval(() => setCount(n => n + 1), shouldUseInterval ? ONE_SECOND : null);

  useEffect(() => {
    if (!selected && completed || !selected && preparationStarted) { // reset
      setPreparationComplete(false);
      setCount(0);
      setPreparationStarted(false);
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
    <Tile
      aria-expanded={showHiddenArea}
      selected={selected}
      onClick={handleSelect}
      ref={listElement}
    >
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
          <SubTitle>{formattedTime}</SubTitle>
        </Details>
        {preparationStarted || completed ? (
          <ToggleSetCompleteButton
            handleClick={() => handleClick()}
            completed={completed}
            onAnimationEnd={onSetComplete}
          />
        ) : (
          <StartTimedExerciseButton
            handleClick={() => {
              if (selected) {
                setPreparationStarted(true);
                // Kill the rest timer before starting a timed exercise.
                setActiveRestTimer({ index: 0, groupId: '' });
              }
            }}
            showIcon={selected}
          />
        )}
      </VisibleArea>

      <HiddenTimerArea
        completed={completed}
        time={formattedTime}
        animatedStyles={animatedStyles}
        preparing={inProgress && !preparationComplete}
        started={preparationStarted}
        paused={paused}
        handleButtonClick={() => !preparationStarted
          ? setPreparationStarted(true)
          : setPaused(!paused)
        }
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
