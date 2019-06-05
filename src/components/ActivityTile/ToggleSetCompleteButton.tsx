import React from 'react';
import CircleTick from '../../assets/svg/CircleTick';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import {
  SelectionArea,
  SelectComplete,
} from './index';

interface Props {
  toggleSetComplete: (completed?: boolean) => ReduxAction;
  completed: boolean;
}

const ToggleSetCompleteButton: React.FC<Props> = ({
  toggleSetComplete,
  completed,
}) => (
  <SelectionArea>
    <SelectComplete onClick={toggleSetComplete}>
      {completed && <CircleTick />}
    </SelectComplete>
  </SelectionArea>
);

export default ToggleSetCompleteButton;
