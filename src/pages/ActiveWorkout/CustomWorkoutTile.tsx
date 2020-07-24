import React  from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  tileMinHeight,
  lightGrey1,
  lightGrey3,
  charcoal,
} from '../../helpers/constants';
import { customWorkoutId } from '../../workoutData/workouts/customWorkout';
import { activitySearchPath } from './ActivitySearch';

const AddActivityButton = styled(Link)`
  height: ${tileMinHeight}px;
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid ${lightGrey1};
  background-color: ${lightGrey3}
  font-weight: 600;
  color: ${charcoal}
  margin-bottom: 30px;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
`;

interface Props {
  setShowHiddenArea: React.Dispatch<React.SetStateAction<boolean>>;
  showHiddenArea: boolean;
}

// This tile sits at the bottom of the custom workout and links to the activity-search
export const CustomWorkoutTile: React.FC<Props> = ({ setShowHiddenArea }) => (
  <AddActivityButton
    // Always collapse the last active tile in the work when transitioning to
    // the activity search. This ensures that when we finish the activity
    // search and return to the active workout, the animation can start from a
    // closed position and the scroll-to-top function will work correctly.
    onClick={() => setShowHiddenArea(false)}
    to={`/workouts/${customWorkoutId}/${activitySearchPath}`}
  >
    + Add a set
  </AddActivityButton>
);
