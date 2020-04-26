import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ActivityTile from '../ActiveWorkout/ActivityTile';
import Timer from '../ActiveWorkout/Timer';
import { BackLinkBanner } from '../../components/BackLinkBanner';
import { workoutHeroWindowStyle, unorderedListStyle } from '../../components/SharedStyles';
import { useSetActiveWorkout } from '../../reducers/activeWorkoutReducer';
import { State } from '../../helpers/types';
import {
  VERSION_ONE,
  tileMinHeight,
  lightLightGrey,
  superLightGrey,
  charcoal,
} from '../../helpers/constants';
import { ActivityListHeading } from '../../pages/ActiveWorkout/ActivityList/ActivityListHeading';
import { Workout } from '../../reducers/workoutsReducer';
import { ActivitySearch } from './ActivitySearch';
import { RestTimerProvider } from '../../context/useRestTimer';

const HeroWindow = styled.div`
  ${workoutHeroWindowStyle}
`;

const Ul = styled.ul`
  ${unorderedListStyle};
`;

const AddActivityButton = styled.button`
  height: ${tileMinHeight}px;
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid ${lightLightGrey};
  background-color: ${superLightGrey}
  font-weight: 600;
  color: ${charcoal}
`;

const customWorkoutId = 'custom-workout';

export const CustomWorkout: React.FC = () => {
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [count, setCount] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const setActiveWorkout = useSetActiveWorkout();
  const activeWorkout = useSelector((state: State) => state.activeWorkout);

  const initialCustomWorkout: Workout = {
    id: customWorkoutId,
    name: 'Custom Workout',
    exerciseGroups: [{
      name: 'Custom Workout',
      id: 'first-group-custom-workout',
      exercises: [],
    }],
    startTime: Date.now(),
    version: VERSION_ONE,
  }

  if (!activeWorkout || activeWorkout.id !== customWorkoutId) {
    setActiveWorkout(initialCustomWorkout);
  }

  const displayedWorkout = activeWorkout || initialCustomWorkout;

  const allActivityTiles = displayedWorkout.exerciseGroups.map(group => {
    const groupActivityTiles = group.exercises.map((activity, i) => {
      // TODO: Refactor ActivityTile to allow targetReps to be optional. If it
      // is undefined, then the colour ring should not change and the reps
      // should just be a number, not a fraction. Eg 12 reps, not 12/14 reps.
      return (
        <ActivityTile
          key={activity.id}
          activity={activity}
          index={i}
          groupId={group.id}
          // TODO: Add these props -->
          // selected
          // handleSelect
          // showHiddenArea
          // toggleShowHiddenArea
        />
      );
    });

    return (
      <ActivityListHeading
        key={group.id}
        heading={group.name}
        activityTotal={groupActivityTiles.length}
      >
        <Ul>{groupActivityTiles}</Ul>
      </ActivityListHeading>
    );
  })

  return (
    <RestTimerProvider value={{
      setShowTimer: setShowRestTimer,
      setRestTime,
      setCount,
    }} >
      <BackLinkBanner
        sticky={false}
        back={{
          showArrows: true,
          link: '/workouts/',
        }}
      />
      <HeroWindow></HeroWindow>
      <Ul>{allActivityTiles}</Ul>
      <AddActivityButton onClick={() => setShowSearch(true)}>
        + Add a set
      </AddActivityButton>

      {showSearch &&
        <ActivitySearch finishSearch={() => setShowSearch(false)}/>
      }

      {showRestTimer && count > 0 && restTime >= 0 &&
        <Timer
          restPeriod={restTime}
          resetTimer={() => {
            setShowRestTimer(false);
            setCount(0);
          }}
          count={count - 1}
        />
      }
    </RestTimerProvider>
  );
};
