import React, { useState } from 'react';
import styled from 'styled-components';
import CircleTick from '../../assets/svg/CircleTick';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  SingleSetAction, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import {
  selectCompleteButtonStyle,
  iconWrapperStyle,
} from './ActivityTileSharedStyles';

const IconWrapper = styled.div`
  ${iconWrapperStyle}
`;

const SelectCompleteButton = styled.button`
  ${selectCompleteButtonStyle}
`;

interface Props {
  handleClick: (completed?: boolean) => (
    ReduxAction<SingleSetAction & { completed?: boolean, }>);
  completed: boolean;
}

const ToggleSetCompleteButton: React.FC<Props> = ({
  handleClick,
  completed,
}) => {
  // animation will run when a click event happens, also when the page reloads
  // and the item is complete. To avoid calling 'showTimer' when reloading the
  // page, we can set a flag to ensure the animation was triggered via click.
  const [ clicked, setClicked ] = useState(false);

  return (
    <SelectCompleteButton onClick={() => {
      handleClick();
      setClicked(true);
    }}>
      <IconWrapper>
        {completed && <CircleTick wasClicked={clicked} />}
      </IconWrapper>
    </SelectCompleteButton>
  );
};

export default ToggleSetCompleteButton;
