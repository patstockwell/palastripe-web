import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CircleTick from '../../assets/svg/CircleTick';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { SELECT_NEXT_EXERCISE } from '../../helpers/constants';
import {
  selectCompleteButtonStyle,
  iconWrapperStyle,
} from './ActivityTileSharedStyles';
import { TimerContext } from '../../pages/ActiveWorkout';

const IconWrapper = styled.div`
  ${iconWrapperStyle}
`;

const SelectCompleteButton = styled.button`
  ${selectCompleteButtonStyle}
`;

interface OwnProps {
  handleClick: () => void;
  completed: boolean;
  timerIsRunning?: boolean;
  restPeriodInSeconds: number;
}

type Props = OwnProps & DispatchProps;

const ToggleSetCompleteButton: React.FC<Props> = ({
  restPeriodInSeconds,
  handleClick,
  completed,
  selectNextExercise,
  timerIsRunning,
}) => {
  // animation will run when a click event happens, also when the page reloads
  // and the item is complete. To avoid calling 'setShowTimer' when reloading the
  // page, we can set a flag to ensure the animation was triggered via click.
  const [ clicked, setClicked ] = useState(false);

  return (
    <TimerContext.Consumer>
      {({ setCount, setShowTimer, setRestTime }) => (
        <SelectCompleteButton onClick={() => {
          // if the rest timer is still running from the last exercise, hide it.
          setShowTimer(false);
          // set the rest time for this completed exercise
          setRestTime(restPeriodInSeconds);
          // run any handlers
          handleClick();
          // set clicked for child animation render checks
          setClicked(true);
        }}>
          <IconWrapper>
            {completed && <CircleTick onAnimationEnd={() => {
              // check the animation was triggered via click and not reload
              if (timerIsRunning || clicked) {
                setCount(0);
                setShowTimer(true);
                selectNextExercise();
              }
            }} />}
          </IconWrapper>
        </SelectCompleteButton>
      )}
    </TimerContext.Consumer>
  );
};

interface DispatchProps {
  selectNextExercise: () => ReduxAction<undefined>;
}

const mapDispatchToProps: DispatchProps = {
  selectNextExercise: () => ({
    type: SELECT_NEXT_EXERCISE,
  }),
};

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(ToggleSetCompleteButton);
