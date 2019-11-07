import React, { useRef, createContext, useState } from 'react';
import { connect } from 'react-redux';
import {
  RouteComponentProps, // eslint-disable-line no-unused-vars
} from 'react-router';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { Link } from 'react-router-dom';

import { PageRefProvider } from '../context/pageRef';
import { AudioProvider } from '../context/audio';
import { buttonStyle } from '../components/SharedStyles';
import { AnimatedSlidingPageStyle } from '../components/SharedStyles';
import { useInterval } from '../helpers/functions';
import { GlobalOverFlowHiddenStyle } from '../components/SharedStyles';
import Timer from '../components/Timer';
import AlertConfirm from '../components/AlertConfirm';
import BackLinkBanner from '../components/BackLinkBanner';
import WorkoutHero from '../components/WorkoutHero';
import FourZeroFour from '../pages/FourZeroFour';
import ActivityList from '../components/ActivityList/ActivityList';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Entities, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  combineDataForAllExercises,
} from '../helpers/functions';
import {
  SET_ACTIVE_WORKOUT,
  FINISH_WORKOUT,
  ONE_SECOND,
  SET_WINDOW_SCROLL,
  ACTIVITY_PAGE,
} from '../helpers/constants';

const Button = styled.button<{ background?: string }>`
  ${buttonStyle}
`;

const LinkButton = styled(Link)<{ background?: string }>`
  ${buttonStyle}
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

export const TimerContext = createContext({
  setShowTimer: (_: boolean) => {/* do nothing */}, // eslint-disable-line
  setRestTime: (_: number) => {/* do nothing */}, // eslint-disable-line
  setCount: (_: number) => {/* do nothing */}, // eslint-disable-line
});

const AnimatedSlidingPage = styled(animated.div)`
  ${AnimatedSlidingPageStyle}
`;

interface OwnProps {
  animationStyles: any;
}

type Match = Pick<RouteComponentProps<{ id: string }>, 'match'>;

type Props = OwnProps & DispatchProps & StateProps & Match;

const ActiveWorkout: React.FC<Props> = ({
  animationStyles,
  finishWorkout,
  entities,
  match,
  activeWorkout,
  setActiveWorkout,
  setWindowScroll,
  soundOn,
}) => {
  const [ showEndWorkoutAlert, setShowEndWorkoutAlert ] = useState(false);
  const [ direction, setDirection ] = useState('left');
  const [ showRestTimer, setShowRestTimer ] = useState(false);
  const [ count, setCount ] = useState(0);
  const [ restTime, setRestTime ] = useState(0);
  const pageRef = useRef(null);

  useInterval(() => {
    setCount(count + 1);
  }, showRestTimer ? ONE_SECOND : null);

  const resetTimer = () => {
    setShowRestTimer(false);
    setCount(0);
  };

  // get the workout ID from the URL
  const { id: workoutId }: { id: string } = match.params;
  const workout = entities.workouts.byId[workoutId];

  if (!workout) {
    return <FourZeroFour />;
  }

  const workoutWithAllActivityData: Workout =
    combineDataForAllExercises(workout, entities.exercises);

  const workoutSetAsActive = activeWorkout && workoutId === activeWorkout.id;

  if (!workoutSetAsActive) {
    // if a workout is visited that is not currently the activeWorkout, set it
    setActiveWorkout(workoutWithAllActivityData);
  }

  const displayedWorkout = workoutSetAsActive
    ? activeWorkout
    : workoutWithAllActivityData;

  const finishWorkoutWithAlertTransition = () => {
    finishWorkout(activeWorkout);
    setDirection('top');
    setShowEndWorkoutAlert(false);
    setWindowScroll(0);
  };

  // Have to instantiate it here and pass it to the provider. When trying to do
  // the same thing in the provider it throws and error?? ->
  // Cannot use 'new' with an expression whose type lacks a call or construct
  // signature.
  const audioContext = new AudioContext();

  return (
    <AudioProvider audioContext={audioContext} soundOn={soundOn}>
      <PageRefProvider value={pageRef}>
        <AnimatedSlidingPage
          style={{ [direction]: animationStyles.left }}
          ref={pageRef}
        >
          <GlobalOverFlowHiddenStyle hidden={showEndWorkoutAlert} />
          <BackLinkBanner
            sticky={false}
            back={{
              showArrows: true,
              link: '/workouts/',
            }}
          />
          <WorkoutHero workout={displayedWorkout} />
          <TimerContext.Provider value={{
            setShowTimer: setShowRestTimer,
            setRestTime,
            setCount,
          }} >
            <ActivityList
              workout={displayedWorkout}
              finishWorkoutClickHandler={() => setShowEndWorkoutAlert(true)}
            />
          </TimerContext.Provider>

          {showRestTimer && count > 0 && restTime >= 0 &&
            <Timer
              restPeriod={restTime}
              resetTimer={resetTimer}
              count={count - 1}
            />
          }

          <AlertConfirm
            cancelAlert={() => setShowEndWorkoutAlert(false)}
            showAlert={showEndWorkoutAlert}
            message={'Are you sure you want to finish the workout?'}
          >
            <Button
              onClick={() => setShowEndWorkoutAlert(false)}
              background={'grey'}>No</Button>
            <LinkButton
              to={{ pathname: '/activity/', state: { immediate: false } }}
              onClick={finishWorkoutWithAlertTransition}
            >Yes</LinkButton>
          </AlertConfirm>
        </AnimatedSlidingPage>
      </PageRefProvider>
    </AudioProvider>
  );
};

interface DispatchProps {
  finishWorkout: (w: Workout) => ReduxAction<{}>;
  setActiveWorkout: (workout: Workout) => ReduxAction<Workout>;
  setWindowScroll: (scrollY: number) => ReduxAction<{
    scrollY: number,
    page: string
  }>;
}

interface StateProps {
  activeWorkout: Workout;
  entities: Entities;
  soundOn: boolean;
}

const mapDispatchToProps: DispatchProps = {
  setWindowScroll: scrollY => ({
    type: SET_WINDOW_SCROLL,
    payload: {
      scrollY,
      page: ACTIVITY_PAGE,
    },
  }),
  finishWorkout: (workout: Workout) => ({
    type: FINISH_WORKOUT,
    payload: workout,
  }),
  setActiveWorkout: (workout: Workout): ReduxAction<Workout> => ({
    type: SET_ACTIVE_WORKOUT,
    payload: workout,
  }),
};

const mapStateToProps = (state: State): StateProps => ({
  activeWorkout: state.activeWorkout,
  entities: state.entities,
  soundOn: state.settings.soundOn,
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(ActiveWorkout);
