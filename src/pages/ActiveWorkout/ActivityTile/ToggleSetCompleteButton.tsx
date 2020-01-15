import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CheckboxTick from '../../../components/CheckboxTick';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../../../helpers/types';
import { SELECT_NEXT_EXERCISE } from '../../../helpers/constants';
import {
  selectCompleteButtonStyle,
} from './ActivityTileSharedStyles';
import { useRestTimer } from '../../../context/restTimer';

const SelectCompleteButton = styled.button`
  ${selectCompleteButtonStyle}
`;

interface OwnProps {
  restPeriodInSeconds: number;
  handleClick: () => void;
  completed: boolean;
  selected: boolean;
}

type Props = OwnProps & DispatchProps;

const ToggleSetCompleteButton: React.FC<Props> = ({
  selectNextExercise,
  restPeriodInSeconds,
  handleClick,
  completed,
  selected,
}) => {
  // animation will run when a click event happens, also when the page reloads
  // and the item is complete. To avoid calling 'setShowTimer' when reloading the
  // page, we can set a flag to ensure the animation was triggered via click.
  const [ clicked, setClicked ] = useState(false);
  const { hideTimer, showTimer } = useRestTimer();

  return (
    <SelectCompleteButton onClick={() => {
      // if the rest timer is still running from the last exercise, hide it.
      hideTimer();
      // run any handlers
      handleClick();
      // set clicked for child animation render checks
      setClicked(true);
    }}>
      <CheckboxTick
        checked={completed}
        onAnimationEnd={() => {
          // check the animation was triggered via click and not reload
          if (selected || clicked) {
            showTimer(restPeriodInSeconds);
            selectNextExercise();
          }
        }}
      />
    </SelectCompleteButton>
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
