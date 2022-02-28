import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

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
import {useSelector} from 'react-redux';
import {UnfinishedWorkoutAlert} from '../ActiveWorkout';

interface Props {
  showMenu: boolean;
  deleteWorkout: () => ReduxAction<number>;
  toggleMenu: () => void;
  workout: Workout;
  historyLink: number;
}

export const ActivityFeedOptionsMenu: React.FC<Props> = ({
  deleteWorkout,
  showMenu,
  toggleMenu,
  workout,
  historyLink,
}) => {
  const [showExistingWorkoutAlert, setShowExistingWorkoutAlert] = useState(false);
  const [showDeleteWorkoutAlert, setShowDeleteWorkoutAlert] = useState(false);
  const {setActiveWorkout} = useActiveWorkout();
  const {setActivityPageScrollPosition} = useScrollPosition();
  const navigate = useNavigate();
  const {activeWorkout, workouts: {allIds}} = useSelector((s: State) => s);
  const {name: activeWorkoutName, id: activeWorkoutId} = activeWorkout || {};

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
      navigate(`/workouts/${workout.id}/`); // Else go straight there.
    }
  };

  const handleRepeatWorkoutConfirmation = () => {
    const incompleteWorkout: Workout = {
      ...workout,
      startTime: (new Date()).toISOString(),
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

  const canRepeatWorkout = allIds.includes(workout.id);

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

        {canRepeatWorkout &&
          <AlertButtonPurple onClick={handleRepeatWorkoutInitialClick} >
            Repeat Workout
          </AlertButtonPurple>
        }

        <HorizontalRuleSpacer />

        <AlertButtonGrey onClick={() => toggleMenu()}>
          Cancel
        </AlertButtonGrey>
      </AlertConfirm>

      <AlertConfirm
        cancelAlert={() => setShowDeleteWorkoutAlert(false)}
        showAlert={showDeleteWorkoutAlert}
        messageText={`"${workout.name}" will be deleted from activity. This action cannot be undone.`}
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

