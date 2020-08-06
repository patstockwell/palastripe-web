import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AudioProvider } from '../../context/useAudio';
import {
  ConfirmButtonLink,
  ConfirmButton,
  AlertConfirm,
} from '../../components/AlertConfirm';
import { BackLinkBanner } from '../../components/BackLinkBanner';
import { WorkoutHero, Window as CustomWorkoutHero } from './WorkoutHero';
import { FourZeroFour } from '../../pages/FourZeroFour';
import { ActivityList } from './ActivityList';
import { State } from '../../helpers/types';
import { lightGrey2, charcoal } from '../../helpers/constants';
import { useScrollPosition } from '../../context/useScrollPosition';
import { useAddWorkoutToHistory } from '../../reducers/historyReducer';
import { useUpdateWorkout } from '../../reducers/workoutsReducer';
import { useActiveWorkout } from '../../reducers/activeWorkoutReducer';
import { customWorkoutId } from '../../workoutData/workouts/customWorkout';
import { useSelectedExercise } from '../../context/useSelectedExercise';

export const ActiveWorkout: React.FC = () => {
  const [ showEndWorkoutAlert, setShowEndWorkoutAlert ] = useState(false);
  const { setActivityPageScrollPosition } = useScrollPosition();
  const addToHistory = useAddWorkoutToHistory();
  const updateWorkoutTemplate = useUpdateWorkout();
  const { finishWorkout, setActiveWorkout } = useActiveWorkout();
  const { setSelectedExercise } = useSelectedExercise()
  const {
    workouts,
    activeWorkout,
    settings: { soundOn },
  } = useSelector((state: State) => state);

  // get the workout ID from the URL
  const { id: workoutId }: { id: string } = useParams();
  const isCustomWorkout = workoutId === customWorkoutId;
  const workoutFromUrl = workouts.byId[workoutId];

  if (!workoutFromUrl) {
    return <FourZeroFour />;
  }

  const workoutSetAsActive = activeWorkout && workoutId === activeWorkout.id;

  if (!workoutSetAsActive) {
    // if a workout is visited that is not currently the activeWorkout, set it
    setActiveWorkout(workoutFromUrl);
  }

  const displayedWorkout = workoutSetAsActive
    ? activeWorkout
    : workoutFromUrl;

  const finishWorkoutWithAlertTransition = () => {
    finishWorkout(); // activeWorkoutReducer
    addToHistory(activeWorkout); // historyReducer
    updateWorkoutTemplate(activeWorkout); // workoutsReducer
    setSelectedExercise({ index: 0, groupId: '' }); // reset selected exercise
    setActivityPageScrollPosition(0); // reset scroll for activity history page
  };

  return (
    <AudioProvider soundOn={soundOn}>
      <BackLinkBanner
        sticky={false}
        back={{
          showArrows: true,
          link: '/workouts/',
        }}
      />
      {isCustomWorkout ? (
        <CustomWorkoutHero imageUrl={displayedWorkout.imageUrl}/>
      ) : (
        <WorkoutHero workout={displayedWorkout} />
      )}
      <ActivityList
        workout={displayedWorkout}
        finishWorkoutClickHandler={() => setShowEndWorkoutAlert(true)}
        isCustomWorkout={isCustomWorkout}
      />

      <AlertConfirm
        cancelAlert={() => setShowEndWorkoutAlert(false)}
        showAlert={showEndWorkoutAlert}
        messageText="This will end your workout and save it to activity history."
      >
        <ConfirmButtonLink
          to="/workout-complete/"
          onClick={finishWorkoutWithAlertTransition}
        >Finish workout</ConfirmButtonLink>
        <ConfirmButton
          onClick={() => setShowEndWorkoutAlert(false)}
          background={lightGrey2}
          fontColour={charcoal}
        >Cancel</ConfirmButton>
      </AlertConfirm>
    </AudioProvider>
  );
};
