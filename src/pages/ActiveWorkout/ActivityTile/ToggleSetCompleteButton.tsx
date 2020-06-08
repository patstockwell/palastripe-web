import React, { useState } from 'react';
import styled from 'styled-components';
import CheckboxTick from '../../../components/CheckboxTick';
import { selectCompleteButtonStyle } from './ActivityTileSharedStyles';
import { useRestTimer } from '../../../context/useRestTimer';
import { useSelectedExercise } from '../../../context/useSelectedExercise';
import { useSelector } from 'react-redux';
import { State } from '../../../helpers/types';
import { customWorkoutId } from '../../../workoutData/workouts/customWorkout';

const SelectCompleteButton = styled.button`
  ${selectCompleteButtonStyle}
`;

interface Props {
  restPeriodInSeconds: number;
  handleClick: () => void;
  completed: boolean;
  selected: boolean;
}

const ToggleSetCompleteButton: React.FC<Props> = ({
  restPeriodInSeconds,
  handleClick,
  completed,
  selected,
}) => {
  // animation will run when a click event happens, also when the page reloads
  // and the item is complete. To avoid calling 'setShowTimer' when reloading the
  // page, we can set a flag to ensure the animation was triggered via click.
  const [ clicked, setClicked ] = useState(false);
  const { hideTimer, showTimer } = useRestTimer();
  const { activeWorkout } = useSelector((state: State) => state);
  const { selectNextExercise } = useSelectedExercise();
  const handleAnimationEnd = () => {
    // check the animation was triggered via click and not reload
    if (selected || clicked) {
      showTimer(restPeriodInSeconds);
      const isCustomWorkout = activeWorkout.id === customWorkoutId;
      // don't select the next exercise if this is a custom workout.
      if (!isCustomWorkout) {
        selectNextExercise();
      }
    }
  };

  return (
    <SelectCompleteButton onClick={() => {
      // if the rest timer is still running from the last exercise, hide it.
      hideTimer();
      // run any handlers
      handleClick();
      // set clicked for child animation render checks
      setClicked(true);
    }}>
      <CheckboxTick
        checked={completed}
        onAnimationEnd={handleAnimationEnd}
      />
    </SelectCompleteButton>
  );
};

export default ToggleSetCompleteButton;
