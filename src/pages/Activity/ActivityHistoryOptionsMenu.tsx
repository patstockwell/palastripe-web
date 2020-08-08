import React, {useState} from 'react';

import {ReduxAction, Activity} from '../../helpers/types';
import {
  AlertButtonBlue,
  AlertButtonGrey,
  AlertButtonOrange,
  AlertConfirm,
} from '../../components/AlertConfirm';
import {Workout} from '../../reducers/workoutsReducer';
import {useScrollPosition} from '../../context/useScrollPosition';
import {useActiveWorkout} from '../../reducers/activeWorkoutReducer';
import {customWorkoutId} from '../../workoutData/workouts/customWorkout';

interface Props {
  showMenu: boolean;
  deleteWorkout: () => ReduxAction<number>;
  toggleMenu: () => void;
  workout: Workout;
  historyLink: number;
}

export const ActivityHistoryOptionsMenu: React.FC<Props> = ({
  deleteWorkout,
  showMenu,
  toggleMenu,
  workout,
  historyLink,
}) => {
  const [showDeleteWorkoutAlert, setShowDeleteWorkoutAlert] = useState(false);
  const {setActiveWorkout} = useActiveWorkout();
  const {setActivityPageScrollPosition} = useScrollPosition();

  const handleDeleteConfirmationClick = () => {
    deleteWorkout();
    setShowDeleteWorkoutAlert(false);
  };

  const handleRepeatWorkoutClick = () => {
    // Only set the active workout if it is the custom workout, otherwise, let
    // the component render the workout as usual from the URL.
    if (workout.id === customWorkoutId) {
      const incompleteWorkout: Workout = {
        ...workout,
        startTime: undefined,
        finishTime: undefined,
        exerciseGroups: workout.exerciseGroups.map(group => ({
          ...group,
          exercises: group.exercises.map((a): Activity => ({
            ...a, completed: false
          })),
        }))
      };

      setActiveWorkout(incompleteWorkout);
    }
  };

  return (
    <>
      <AlertConfirm
        cancelAlert={() => toggleMenu()}
        showAlert={showMenu}
        messageText="Options"
      >
        <AlertButtonGrey
          onClick={() => setActivityPageScrollPosition(window.scrollY)}
          to={`/activity/${historyLink}`}
        >
          View Summary
        </AlertButtonGrey>

        <AlertButtonGrey
          onClick={() => {
            setShowDeleteWorkoutAlert(true);
            toggleMenu();
          }}
        >
          Delete Workout
        </AlertButtonGrey>

        <AlertButtonGrey
          onClick={handleRepeatWorkoutClick}
          to={`/workouts/${workout.id}/`}
        >
          Repeat Workout
        </AlertButtonGrey>

        <br />

        <AlertButtonBlue onClick={() => toggleMenu()}>
          Cancel
        </AlertButtonBlue>
      </AlertConfirm>

      <AlertConfirm
        cancelAlert={() => setShowDeleteWorkoutAlert(false)}
        showAlert={showDeleteWorkoutAlert}
        messageText="This completed workout will be deleted. This action cannot be undone."
      >
        <AlertButtonOrange onClick={handleDeleteConfirmationClick}>
          Delete
        </AlertButtonOrange>

        <br />

        <AlertButtonBlue onClick={() => setShowDeleteWorkoutAlert(false)}>
          Cancel
        </AlertButtonBlue>
      </AlertConfirm>
    </>
  );
};

