import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {ReduxAction, Activity, State} from '../../helpers/types';
import {
  AlertButtonPurple,
  AlertButtonGrey,
  AlertButtonOrange,
  AlertConfirm,
  HorizontalRuleSpacer,
} from '../../components/AlertConfirm';
import {Workout} from '../../reducers/workoutsReducer';
import {useScrollPosition} from '../../context/useScrollPosition';
import {useActiveWorkout} from '../../reducers/activeWorkoutReducer';
import {onTheFlyWorkoutId} from '../../workoutData/workouts/onTheFly';
import {useSelector} from 'react-redux';
import {UnfinishedWorkoutAlert} from '../ActiveWorkout';

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

        <HorizontalRuleSpacer />

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
        <HorizontalRuleSpacer />
        <AlertButtonGrey onClick={() => setShowDeleteWorkoutAlert(false)}>
          Cancel
        </AlertButtonGrey>
      </AlertConfirm>

      <UnfinishedWorkoutAlert
        cancelAlert={() => setShowExistingWorkoutAlert(false)}
        showAlert={showExistingWorkoutAlert}
        activeWorkoutName={activeWorkoutName}
        continueLink={`/workouts/${activeWorkoutId}/`}
        startLink={`/workouts/${workout.id}/`}
        onStartNewWorkout={handleRepeatWorkoutConfirmation}
      />
    </>
  );
};

