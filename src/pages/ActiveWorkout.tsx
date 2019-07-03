import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  RouteComponentProps, // eslint-disable-line no-unused-vars
} from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import { animated } from 'react-spring';
import AlertConfirm, { LinkButton, Button } from '../components/AlertConfirm';
import BackLinkBanner from '../components/BackLinkBanner';
import ViewWorkoutHero from '../components/ViewWorkoutHero';
import FourZeroFour from '../pages/FourZeroFour';
import ActivityList from '../components/ActivityList/ActivityList';
import {
  ReduxAction, //eslint-disable-line no-unused-vars
  Entities, //eslint-disable-line no-unused-vars
  State, //eslint-disable-line no-unused-vars
  Workout, //eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  combineDataForAllExercises,
  formatMinutes,
  calculateWorkoutTime,
} from '../helpers/functions';
import { SET_ACTIVE_WORKOUT, FINISH_WORKOUT, purple } from '../helpers/constants';

export const AnimatedSlidingPage = styled(animated.div)`
  z-index: 10;
  top: 0;
  width: 100%;
  -webkit-overflow-scrolling: touch; // enables momentum scolling
`;

const GlobalStyle = createGlobalStyle<{ hidden: boolean }>`
  body {
    // used for when the modal is displayed
    // to avoid background scrolling
    overflow: ${({ hidden }) => hidden ? 'hidden' : 'visible'};
  }
`;

interface OwnProps {
  animationStyles: any;
}

type Match = Pick<RouteComponentProps<{ id: string }>, 'match'>

type Props = OwnProps & DispatchProps & StateProps & Match;

const ActiveWorkout: React.FC<Props> = ({
  animationStyles,
  finishWorkout,
  entities,
  match,
  activeWorkout,
  setActiveWorkout,
}) => {
  const [ showEndWorkoutAlert, setShowEndWorkoutAlert ] = useState(false);
  const [ direction, setDirection ] = useState('left');

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
  };

  return (
    <AnimatedSlidingPage
      style={{
        position: animationStyles.position,
        [direction]: animationStyles.left,
      }}
    >
      <GlobalStyle hidden={showEndWorkoutAlert} />
      <BackLinkBanner sticky={false} back={{ link: '/workouts/' }} />
      <ViewWorkoutHero
        name={displayedWorkout.name}
        imageUrl={displayedWorkout.imageUrl}
        time={formatMinutes(calculateWorkoutTime(displayedWorkout))}
      />
      <ActivityList
        workout={displayedWorkout}
        finishWorkoutClickHandler={() => setShowEndWorkoutAlert(true)}
      />

      <AlertConfirm
        cancelAlert={() => setShowEndWorkoutAlert(false)}
        showAlert={showEndWorkoutAlert}
        message={'Are you sure you want to finish the workout?'}
      >
        <Button
          onClick={() => setShowEndWorkoutAlert(false)}
          background={'grey'}>No</Button>
        <LinkButton
          to={{ pathname: '/home/', state: { immediate: false } }}
          onClick={finishWorkoutWithAlertTransition}
          background={purple}>Yes</LinkButton>
      </AlertConfirm>
    </AnimatedSlidingPage>
  );
};

interface DispatchProps {
  finishWorkout: (w: Workout) => ReduxAction<{}>;
  setActiveWorkout: (workout: Workout) => ReduxAction<Workout>;
}

interface StateProps {
  activeWorkout: Workout;
  entities: Entities;
}

const mapDispatchToProps = {
  finishWorkout: (workout: Workout) => ({
    type: FINISH_WORKOUT,
    payload: workout,
  }),
  setActiveWorkout: (workout: Workout): ReduxAction<Workout> => ({
    type: SET_ACTIVE_WORKOUT,
    payload: workout,
  }),
};

const mapStateToProps = (state: State) => ({
  activeWorkout: state.activeWorkout,
  entities: state.entities,
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(ActiveWorkout);
