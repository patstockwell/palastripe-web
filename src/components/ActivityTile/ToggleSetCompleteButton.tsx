import React from 'react';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import {
  SelectionArea,
  SelectComplete,
} from './index';

interface Props {
  toggleSetComplete: () => (ReduxAction | boolean);
}

const ToggleSetCompleteButton: React.FC<Props> = ({ toggleSetComplete }) => (
  <SelectionArea>
    <SelectComplete onClick={toggleSetComplete} />
  </SelectionArea>
);

export default ToggleSetCompleteButton;
