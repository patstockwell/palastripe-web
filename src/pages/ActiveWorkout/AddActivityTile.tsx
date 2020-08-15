import React  from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {
  tileMinHeight,
  lightGrey1,
  lightGrey3,
  charcoal,
} from '../../helpers/constants';
import {onTheFlyWorkoutId} from '../../workoutData/workouts/onTheFly';
import {activitySearchPath} from './ActivitySearch';
import {useSelectedExercise} from '../../context/useSelectedExercise';

const AddActivityButton = styled(Link)`
  height: ${tileMinHeight}px;
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid ${lightGrey1};
  background-color: ${lightGrey3}
  font-weight: 600;
  color: ${charcoal}
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
`;

interface Props {
  setShowHiddenArea: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddActivityTile: React.FC<Props> = ({setShowHiddenArea}) => {
  const {setSelectedExercise} = useSelectedExercise();

  return (
    <AddActivityButton
      onClick={() => {
        // Always collapse the last active tile in the workout when
        // transitioning to the activity search. This ensures that when we
        // finish the activity search and return to the active workout, the
        // animation can start from a closed position and the scroll-to-top
        // function will work correctly.
        setShowHiddenArea(false);
        // Reset the selected exercise so that if the user cancels the search
        // and returns to the active workout, then nothing will be selected and
        // you will be at the top of the screen. This avoids the rest timer
        // popping up and a tile being opened and pulled into view.
        setSelectedExercise({ index: 0, groupId: '' });
      }}
      to={`/workouts/${onTheFlyWorkoutId}/${activitySearchPath}`}
    >
      + Add a set
    </AddActivityButton>
  );
};
