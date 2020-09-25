import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {isAfter, add} from 'date-fns';

import {AudioProvider} from '../../context/useAudio';
import {
  AlertButtonPurple,
  AlertButtonGrey,
  AlertConfirm,
  HorizontalRuleSpacer,
} from '../../components/AlertConfirm';
import {BackLinkBanner} from '../../components/BackLinkBanner';
import {WorkoutHero} from './WorkoutHero';
import {FourZeroFour} from '../../pages/FourZeroFour';
import {ActivityList} from './ActivityList';
import {State} from '../../helpers/types';
import {useScrollPosition} from '../../context/useScrollPosition';
import {useAddWorkoutToHistory} from '../../reducers/historyReducer';
import {useUpdateWorkout, Workout} from '../../reducers/workoutsReducer';
import {useActiveWorkout} from '../../reducers/activeWorkoutReducer';
import {onTheFlyWorkoutId} from '../../workoutData/workouts/onTheFly';
import {useSelectedExercise} from '../../context/useSelectedExercise';
import {RestTimerProvider} from '../../context/useRestTimer';

export const ActiveWorkout: React.FC = () => {
  const [showEndWorkoutAlert, setShowEndWorkoutAlert] = useState(false);
  const [showExistingWorkoutAlert, setShowExistingWorkoutAlert] = useState(false);
  const [showWorkoutTooLongAlert, setShowWorkoutTooLongAlert] = useState(false);
  const {setActivityPageScrollPosition} = useScrollPosition();
  const addToHistory = useAddWorkoutToHistory();
  const {updateWorkout} = useUpdateWorkout();
  const {clearActiveWorkout, setActiveWorkout} = useActiveWorkout();
  const {setSelectedExercise} = useSelectedExercise();
  const {
    workouts,
    activeWorkout,
    settings: {soundOn},
  } = useSelector((state: State) => state);

  // get the workout ID from the URL
  const {id: idFromUrl}: {id: string} = useParams();
  const workoutFromUrl = workouts.byId[idFromUrl];

  if (!workoutFromUrl) {
    return <FourZeroFour />;
  }

  if (!activeWorkout || !activeWorkout.startTime) {
    setActiveWorkout(workoutFromUrl);
  }

  // An unfinished workout exists if there is an active workout with a start
  // time, there is an valid workout URL, and these 2 things don't match.
  const unfinsihedWorkoutExists = Boolean(activeWorkout
    && activeWorkout.startTime
    && workoutFromUrl !== undefined
    && idFromUrl !== activeWorkout.id);

  // Check if we should alert for a workout that is too long.
  const workoutStartTime = activeWorkout && activeWorkout.startTime || Date.now();
  if (!unfinsihedWorkoutExists && !showWorkoutTooLongAlert) {
    const maxWorkoutLength = add(new Date(workoutStartTime), { hours: 4 });
    const workoutIsStale = isAfter(new Date(), maxWorkoutLength);
    if (workoutIsStale) {
      setShowWorkoutTooLongAlert(true);
    }
  }

  const checkUnfinishedWorkout = (callback: () => void) => {
    if (unfinsihedWorkoutExists && !showExistingWorkoutAlert) {
      setShowExistingWorkoutAlert(true);
    } else {
      callback();
    }
  };

  const displayedWorkout = activeWorkout && idFromUrl === activeWorkout.id
    ? activeWorkout // This is the expected case where URL & activeWorkout match
    : workoutFromUrl;

  const finishWorkout = (finishTime?: string) => {
    clearActiveWorkout(); // activeWorkoutReducer
    setSelectedExercise({ index: 0, groupId: '' }); // reset selected exercise
    setActivityPageScrollPosition(0); // reset scroll for activity history page
    addToHistory({ // historyReducer
      ...activeWorkout,
      // This enables setting the finishTime when the workout exceeds 4 hours.
      finishTime: finishTime || activeWorkout.finishTime,
    });
    if (workoutFromUrl) {
      updateWorkout(activeWorkout); // workoutsReducer
    }
  };

  const startWorkoutFromUrl = () => {
    setActiveWorkout({
      ...workoutFromUrl,
      startTime: (new Date).toISOString(),
    });
    setShowExistingWorkoutAlert(false);
    setSelectedExercise({
      index: 0,
      groupId: workoutFromUrl.exerciseGroups[0].id,
    });
  };

  return (
    <RestTimerProvider>
      <AudioProvider soundOn={soundOn}>
        <BackLinkBanner
          sticky={false}
          back={{
            showArrows: true,
            link: '/workouts/',
          }}
        />
        <WorkoutHero
          workout={displayedWorkout}
          checkCanStartWorkout={checkUnfinishedWorkout}
        />
        <ActivityList
          workout={displayedWorkout}
          finishWorkoutClickHandler={() => setShowEndWorkoutAlert(true)}
          isOnTheFlyWorkout={idFromUrl === onTheFlyWorkoutId}
          checkCanSelectTile={checkUnfinishedWorkout}
        />

        <UnfinishedWorkoutAlert
          cancelAlert={() => setShowExistingWorkoutAlert(false)}
          showAlert={showExistingWorkoutAlert}
          activeWorkoutName={activeWorkout && activeWorkout.name}
          onStartNewWorkout={startWorkoutFromUrl}
          continueLink={`/workouts/${activeWorkout && activeWorkout.id}/`}
        />

        <FinishWorkoutAlert
          cancelAlert={() => setShowEndWorkoutAlert(false)}
          showAlert={showEndWorkoutAlert}
          finishWorkout={finishWorkout}
        />

        <WorkoutTooLongAlert
          cancelAlert={() => setShowWorkoutTooLongAlert(false)}
          showAlert={showWorkoutTooLongAlert}
          activeWorkout={activeWorkout}
          finishWorkout={finishWorkout}
        />

      </AudioProvider>
    </RestTimerProvider>
  );
};

const FinishWorkoutAlert: React.FC<{
  cancelAlert: () => void;
  showAlert: boolean;
  finishWorkout: (finishTime?: string) => void;
}> = ({
  cancelAlert,
  showAlert,
  finishWorkout,
}) => (
  <AlertConfirm
    cancelAlert={cancelAlert}
    showAlert={showAlert}
    messageText="This will end your workout and save it to activity history."
  >
    <AlertButtonPurple
      to="/workout-complete/"
      onClick={() => finishWorkout()}
    >
      Finish workout
    </AlertButtonPurple>
    <HorizontalRuleSpacer />
    <AlertButtonGrey onClick={cancelAlert}>
      Cancel
    </AlertButtonGrey>
  </AlertConfirm>
);

export const UnfinishedWorkoutAlert: React.FC<{
  cancelAlert: () => void;
  showAlert: boolean;
  onStartNewWorkout: () => void;
  activeWorkoutName: string;
  continueLink?: string;
  startLink?: string;
}> = ({
  onStartNewWorkout,
  cancelAlert,
  showAlert,
  activeWorkoutName,
  continueLink,
  startLink,
}) => (
  <AlertConfirm
    cancelAlert={cancelAlert}
    showAlert={showAlert}
    messageText={`"${activeWorkoutName}" is not finished. Starting a new workout will clear all progress.`}
  >
    <AlertButtonPurple onClick={cancelAlert} to={continueLink}>
      Continue existing workout
    </AlertButtonPurple>
    <AlertButtonPurple to={startLink} onClick={onStartNewWorkout}>
      Start new workout
    </AlertButtonPurple>
    <HorizontalRuleSpacer />
    <AlertButtonGrey onClick={cancelAlert}>
    Cancel
    </AlertButtonGrey>
  </AlertConfirm>
);

const WorkoutTooLongAlert: React.FC<{
  cancelAlert: () => void;
  showAlert: boolean;
  activeWorkout: Workout;
  finishWorkout: (finishTime?: string) => void;
}> = ({finishWorkout, activeWorkout, showAlert, cancelAlert}) => {

  return activeWorkout && (
    <AlertConfirm
      showAlert={showAlert}
      cancelAlert={cancelAlert}
      messageText="This workout was started more than 4 hours ago. This will complete and log your workout in its current state."
    >
      <AlertButtonPurple
        to="/workout-complete/"
        onClick={() => {
          // We check for stale workouts by checking if the workout started
          // more than 4 hours ago. The default workout length for a stale
          // workout is just 1 hour.
          const finishDate = add(new Date(activeWorkout.startTime), { hours: 1 });
          finishWorkout(finishDate.toISOString());
        }}
      >
        End workout
      </AlertButtonPurple>
    </AlertConfirm>
  );
};
