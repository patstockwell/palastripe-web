import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  RouteComponentProps, // eslint-disable-line no-unused-vars
} from 'react-router';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { GlobalOverFlowHiddenStyle } from '../components/SharedStyles';

import AlertConfirm, { LinkButton, Button } from '../components/AlertConfirm';
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
  formatMinutes,
  calculateWorkoutTime,
} from '../helpers/functions';
import { SET_ACTIVE_WORKOUT, FINISH_WORKOUT, purple } from '../helpers/constants';

export const AnimatedSlidingPage = styled(animated.div)<{ position?: string }>`
  z-index: 10;
  top: 0;
  width: 100%;
  -webkit-overflow-scrolling: touch; // enables momentum scolling
  position: ${({ position }) => position};
`;

interface OwnProps {
  animationStyles: any;
  destroyed: boolean;
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
  destroyed,
  isFirstRender,
}) => {
  const [ showEndWorkoutAlert, setShowEndWorkoutAlert ] = useState(false);
  const [ isRelativePosition, setIsRelativePosition ] = useState(false);
  const [ isFixedPostion, setIsFixedPostion ] = useState(false);
  const [ scrollNotReset, setScrollNotReset ] = useState(true);
  const [ direction, setDirection ] = useState('left');

  useEffect(() => {
    if (destroyed && scrollNotReset) {
      window.scrollTo(0, 0);
      setIsRelativePosition(true);
      setScrollNotReset(false);
    }

    // if we have landed on the page without a transition (static render)
    if (isFirstRender) {
      setIsRelativePosition(true);
    }
  });

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
    setIsFixedPostion(true);
    finishWorkout(activeWorkout);
    setDirection('top');
    setShowEndWorkoutAlert(false);
  };

  const position = isRelativePosition && !isFixedPostion
    ? 'relative'
    : 'fixed';

  return (
    <AnimatedSlidingPage
      position={position}
      style={{
        [direction]: animationStyles.left,
      }}
    >
      <GlobalOverFlowHiddenStyle hidden={showEndWorkoutAlert} />
      <BackLinkBanner
        sticky={false}
        back={{
          handleClick: () => setIsFixedPostion(true),
          link: '/workouts/',
        }}
      />
      <WorkoutHero
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
          to={{ pathname: '/activity/', state: { immediate: false } }}
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
  isFirstRender: boolean;
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

const mapStateToProps = (state: State): StateProps => ({
  activeWorkout: state.activeWorkout,
  entities: state.entities,
  isFirstRender: state.isFirstRender,
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(ActiveWorkout);
