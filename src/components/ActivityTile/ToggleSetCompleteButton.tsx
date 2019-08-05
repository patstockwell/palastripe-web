import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CircleTick from '../../assets/svg/CircleTick';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  SingleSetAction, // eslint-disable-line no-unused-vars
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
  handleClick: (completed?: boolean) => (
    ReduxAction<SingleSetAction & { completed?: boolean, }>);
  completed: boolean;
  timerIsRunning?: boolean;
}

type Props = OwnProps & DispatchProps;

const ToggleSetCompleteButton: React.FC<Props> = ({
  handleClick,
  completed,
  selectNextExercise,
  timerIsRunning,
}) => {
  // animation will run when a click event happens, also when the page reloads
  // and the item is complete. To avoid calling 'showTimer' when reloading the
  // page, we can set a flag to ensure the animation was triggered via click.
  const [ clicked, setClicked ] = useState(false);

  return (
    <TimerContext.Consumer>
      {({ showTimer }) => (
        <SelectCompleteButton onClick={() => {
          handleClick();
          setClicked(true);
        }}>
          <IconWrapper>
            {completed && <CircleTick onAnimationEnd={() => {
              // check the animation was triggered via click and not reload
              if (timerIsRunning || clicked) {
                showTimer();
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
