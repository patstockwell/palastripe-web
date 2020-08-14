import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {ReduxAction, Activity, State} from '../../helpers/types';
import {
  AlertButtonPurple,
  AlertButtonGrey,
  AlertButtonOrange,
  AlertConfirm,
} from '../../components/AlertConfirm';
import {Workout} from '../../reducers/workoutsReducer';
import {useScrollPosition} from '../../context/useScrollPosition';
import {useActiveWorkout} from '../../reducers/activeWorkoutReducer';
import {customWorkoutId} from '../../workoutData/workouts/customWorkout';
import {useSelector} from 'react-redux';

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
  const {activeWorkout} = useSelector((s: State) => s);
  const [showExistingWorkoutAlert, setShowExistingWorkoutAlert] = useState(false);
  const [showDeleteWorkoutAlert, setShowDeleteWorkoutAlert] = useState(false);
  const {setActiveWorkout} = useActiveWorkout();
  const {setActivityPageScrollPosition} = useScrollPosition();
  const history = useHistory();
  const {
    name: activeWorkoutName,
    id: activeWorkoutId,
  } = useSelector((state: State) => state.activeWorkout) || {};

  const handleDeleteConfirmationClick = () => {
    deleteWorkout();
    setShowDeleteWorkoutAlert(false);
  };

  const handleRepeatWorkoutInitialClick = () => {
    // If there is an existing workout, show an alert first
    if (activeWorkout && activeWorkout.startTime) {
      setShowExistingWorkoutAlert(true);
      toggleMenu();
    } else {
      handleRepeatWorkoutConfirmation();
      history.push(`/workouts/${workout.id}/`); // Else go straight there.
    }
  };

  const handleRepeatWorkoutConfirmation = () => {
    console.log('here', workout.id, workout.id === customWorkoutId);
    // Only set the active workout if it is the custom workout, otherwise,
    // clear the active workout first by setting it to null, and then let the
    // component render the workout as usual from the URL.
    if (workout.id === customWorkoutId) {
      console.log('inside');
      const incompleteWorkout: Workout = {
        ...workout,
        startTime: (new Date).toISOString(),
        finishTime: undefined,
        exerciseGroups: workout.exerciseGroups.map(group => ({
          ...group,
          exercises: group.exercises.map((a): Activity => ({
            ...a, completed: false
          })),
        }))
      };

      setActiveWorkout(incompleteWorkout);
    } else {
      setActiveWorkout(null);
    }
  };

  return (
    <>
      <AlertConfirm
        cancelAlert={() => toggleMenu()}
        showAlert={showMenu}
        messageText="Options"
      >
        <AlertButtonPurple
          onClick={() => setActivityPageScrollPosition(window.scrollY)}
          to={`/activity/${historyLink}`}
        >
          View Summary
        </AlertButtonPurple>

        <AlertButtonPurple
          onClick={() => {
            setShowDeleteWorkoutAlert(true);
            toggleMenu();
          }}
        >
          Delete Workout
        </AlertButtonPurple>

        <AlertButtonPurple onClick={handleRepeatWorkoutInitialClick} >
          Repeat Workout
        </AlertButtonPurple>

        <br />

        <AlertButtonGrey onClick={() => toggleMenu()}>
          Cancel
        </AlertButtonGrey>
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

        <AlertButtonGrey onClick={() => setShowDeleteWorkoutAlert(false)}>
          Cancel
        </AlertButtonGrey>
      </AlertConfirm>

      <AlertConfirm
        cancelAlert={() => setShowExistingWorkoutAlert(false)}
        showAlert={showExistingWorkoutAlert}
        messageText={`"${activeWorkoutName}" is not finished. Starting a new workout will clear all progress.`}
      >
        <AlertButtonPurple
          onClick={handleRepeatWorkoutConfirmation}
          to={`/workouts/${workout.id}/`}
        >
          Start new workout
        </AlertButtonPurple>
        <AlertButtonGrey to={`/workouts/${activeWorkoutId}/`}>
          Continue existing workout
        </AlertButtonGrey>
        <br />
        <AlertButtonGrey onClick={() => setShowExistingWorkoutAlert(false)}>
          Cancel
        </AlertButtonGrey>
      </AlertConfirm>
    </>
  );
};

