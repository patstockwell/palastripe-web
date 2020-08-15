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
  const updateWorkoutTemplate = useUpdateWorkout();
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

  // If the active workout exists but the URL is not recognised, just continue
  // with the active workout anyway. This allows repeating old workouts, even if
  // they have been removed from the list of workout ids.
  if (!workoutFromUrl && activeWorkout === null) {
    return <FourZeroFour />;
  }
  // At this point, we either have a good URL, or an active workout.
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
  // This is the expected case where URL & activeWorkout match.
    ? activeWorkout
  // There is a fallback (OR) on the false side of the ternary case because
  // there is a case where the URL is not recognised but there is already an
  // active workout set. We should allow the workout to be rendered at any
  // unknown URL as long as a workout is set. This allows repeating workouts
  // that are no longer in the list of workout ids.
    : workoutFromUrl || activeWorkout;

  const finishWorkout = (finishTime?: string) => {
    clearActiveWorkout(); // activeWorkoutReducer
    updateWorkoutTemplate(activeWorkout); // workoutsReducer
    setSelectedExercise({ index: 0, groupId: '' }); // reset selected exercise
    setActivityPageScrollPosition(0); // reset scroll for activity history page
    addToHistory({ // historyReducer
      ...activeWorkout,
      finishTime: finishTime || activeWorkout.finishTime,
    });
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

  // Only when the URL and the active workout match.
  const isOnTheFlyWorkout =
    idFromUrl === onTheFlyWorkoutId
    && activeWorkout
    && activeWorkout.id === onTheFlyWorkoutId;

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
          isOnTheFlyWorkout={isOnTheFlyWorkout}
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
      messageText="This workout is more than 4 hours long. This will complete and log your workout in its current state."
    >
      <AlertButtonPurple
        to="/workout-complete/"
        onClick={() => {
          const finishDate = add(new Date(activeWorkout.startTime), { hours: 4 });
          finishWorkout(finishDate.toISOString());
        }}
      >
        End workout
      </AlertButtonPurple>
    </AlertConfirm>
  );
};
