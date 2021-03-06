import React from 'react';
import styled from 'styled-components';

import startAudio from '../../../assets/activityStart.mp3';
import completeAudio from '../../../assets/activityEnd.mp3';
import { purple } from '../../../helpers/constants';
import Play from '../../../assets/svg/Play';
import { selectCompleteButtonStyle } from './ActivityTileSharedStyles';
import { checkboxWrapperStyle } from '../../../components/SharedStyles';
import { useAudio } from '../../../context/useAudio';

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

export const StartTimedExerciseButton: React.FC<Props> = ({
  showIcon,
  handleClick,
}) => {
  const { setAudio } = useAudio();

  return (
    <SelectCompleteButton onClick={() => {
      handleClick();
      // by initialising audio here after a click event, it gives the
      // user-agent permission to play the audio later
      const start = new Audio(startAudio);
      const complete = new Audio(completeAudio);
      setAudio(start, complete);
    }}>
      <IconWrapper background={showIcon && 'white'}>
        {showIcon && <Play style={{ height: 28, width: 28, fill: purple }}/>}
      </IconWrapper>
    </SelectCompleteButton>
  );
};
