import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {AudioProvider} from '../../context/useAudio';
import {
  AlertButtonPurple,
  AlertButtonGrey,
  AlertConfirm,
} from '../../components/AlertConfirm';
import {BackLinkBanner} from '../../components/BackLinkBanner';
import {WorkoutHero} from './WorkoutHero';
import {FourZeroFour} from '../../pages/FourZeroFour';
import {ActivityList} from './ActivityList';
import {State} from '../../helpers/types';
import {useScrollPosition} from '../../context/useScrollPosition';
import {useAddWorkoutToHistory} from '../../reducers/historyReducer';
import {useUpdateWorkout} from '../../reducers/workoutsReducer';
import {useActiveWorkout} from '../../reducers/activeWorkoutReducer';
import {customWorkoutId} from '../../workoutData/workouts/customWorkout';
import {useSelectedExercise} from '../../context/useSelectedExercise';
import {RestTimerProvider} from '../../context/useRestTimer';

export const ActiveWorkout: React.FC = () => {
  const [showEndWorkoutAlert, setShowEndWorkoutAlert] = useState(false);
  const [showExistingWorkoutAlert, setShowExistingWorkoutAlert] = useState(false);
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
  const isCustomWorkout = idFromUrl === customWorkoutId;
  const workoutFromUrl = workouts.byId[idFromUrl];

  if (!workoutFromUrl) {
    return <FourZeroFour />;
  }

  const unfinsihedWorkoutExists = activeWorkout
    && activeWorkout.startTime
    && idFromUrl !== activeWorkout.id;

  if (unfinsihedWorkoutExists && !showExistingWorkoutAlert) {
    setShowExistingWorkoutAlert(true);
  } else if (!activeWorkout) {
    setActiveWorkout(workoutFromUrl);
  }

  const displayedWorkout = activeWorkout && idFromUrl === activeWorkout.id
    ? activeWorkout // This is the expected case where URL & activeWorkout match.
    : workoutFromUrl; // An alert will pop up in this case.

  const finishWorkoutWithAlertTransition = () => {
    clearActiveWorkout(); // activeWorkoutReducer
    addToHistory(activeWorkout); // historyReducer
    updateWorkoutTemplate(activeWorkout); // workoutsReducer
    setSelectedExercise({ index: 0, groupId: '' }); // reset selected exercise
    setActivityPageScrollPosition(0); // reset scroll for activity history page
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
        <WorkoutHero workout={displayedWorkout} />
        <ActivityList
          workout={displayedWorkout}
          finishWorkoutClickHandler={() => setShowEndWorkoutAlert(true)}
          isCustomWorkout={isCustomWorkout}
        />

        <AlertConfirm
          showAlert={showExistingWorkoutAlert}
          messageText={`"${activeWorkout && activeWorkout.name}" is not finished. Starting a new workout will clear all progress.`}
        >
          <AlertButtonPurple
            onClick={() => {
              setActiveWorkout(workoutFromUrl);
              setShowExistingWorkoutAlert(false);
            }}
          >
            Start new workout
          </AlertButtonPurple>
          <AlertButtonGrey
            onClick={() => setShowExistingWorkoutAlert(false)}
            to={`/workouts/${activeWorkout && activeWorkout.id}/`}
          >
            Continue existing workout
          </AlertButtonGrey>
        </AlertConfirm>

        <AlertConfirm
          cancelAlert={() => setShowEndWorkoutAlert(false)}
          showAlert={showEndWorkoutAlert}
          messageText="This will end your workout and save it to activity history."
        >
          <AlertButtonPurple
            to="/workout-complete/"
            onClick={finishWorkoutWithAlertTransition}
          >
            Finish workout
          </AlertButtonPurple>
          <AlertButtonGrey onClick={() => setShowEndWorkoutAlert(false)}>
            Cancel
          </AlertButtonGrey>
        </AlertConfirm>
      </AudioProvider>
    </RestTimerProvider>
  );
};
