import React from 'react';
import styled from 'styled-components';

import { useRestTimer } from '../../context/restTimer';
import { purple } from '../../helpers/constants';
import Play from '../../assets/svg/Play';
import {
  selectCompleteButtonStyle,
  checkboxWrapperStyle,
} from './ActivityTileSharedStyles';

const IconWrapper = styled.div<{ background?: string }>`
  ${checkboxWrapperStyle}
  background: ${({ background }) => background};
`;

const SelectCompleteButton = styled.button`
  ${selectCompleteButtonStyle}
`;

interface Props {
  handleClick: () => void;
  showIcon: boolean;
}

const StartTimedExerciseButton: React.FC<Props> = ({
  showIcon,
  handleClick,
}) => {
  const { setShowTimer } = useRestTimer();

  return (
    <SelectCompleteButton onClick={() => {
      handleClick();
      setShowTimer(false);
    }}>
      <IconWrapper background={showIcon && 'white'}>
        {showIcon && <Play style={{ height: 28, width: 28, fill: purple }}/>}
      </IconWrapper>
    </SelectCompleteButton>
  );
};

export default StartTimedExerciseButton;
