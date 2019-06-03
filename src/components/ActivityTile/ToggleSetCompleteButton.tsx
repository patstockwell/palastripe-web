import React from 'react';
import { connect } from 'react-redux';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import {
  SelectionArea,
  SelectComplete,
} from './index';
import { TOOGLE_SET_COMPLETE } from '../../helpers/constants';

interface Props {
  group: string;
  index: number;
  selected: boolean;
  toggleSetComplete: (group: string, index: number) => ReduxAction;
}

const ToggleSetCompleteButton: React.FC<Props> = ({
  group,
  index,
  selected,
  toggleSetComplete,
}) => (
  <SelectionArea>
    <SelectComplete
      onClick={() =>
        selected && toggleSetComplete(group, index)
      }
    />
  </SelectionArea>
);

const mapDispatchToProps = {
  toggleSetComplete: (group: string, index: number): ReduxAction => ({
    type: TOOGLE_SET_COMPLETE,
    payload: { group, index },
  }),
};

export default connect(null, mapDispatchToProps)(ToggleSetCompleteButton);
