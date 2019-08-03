import React from 'react';
import styled from 'styled-components';

import { purple } from '../../helpers/constants';
import Play from '../../assets/svg/Play';
import {
  selectCompleteButtonStyle,
  iconWrapperStyle,
} from './ActivityTileSharedStyles';

const IconWrapper = styled.div<{ background?: string }>`
  ${iconWrapperStyle}
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
  return (
    <SelectCompleteButton onClick={handleClick}>
      <IconWrapper background={showIcon && 'white'}>
        {showIcon && <Play style={{ height: 28, width: 28, fill: purple }}/>}
      </IconWrapper>
    </SelectCompleteButton>
  );
};

export default StartTimedExerciseButton;
