import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { DELETE_WORKOUT } from '../helpers/constants';
import ActivityHistoryTile from './ActivityHistoryTile';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const BottomSpace = styled.div`
  height: 200px;
`;

interface OwnProps {
  history: Workout[];
}

type Props = OwnProps & DispatchProps;

const ActivityHistoryList: React.FC<Props> = ({ history, deleteWorkout }) => {
  // undefined is used to denote no tile in list is selected
  const [ showMenuIndex, setShowMenuIndex ] = useState(undefined);

  const historyTiles = history.map((w, i) => (
    <ActivityHistoryTile
      key={w.finishTime}
      workout={w}
      showMenu={showMenuIndex === i}
      toggleMenu={() => setShowMenuIndex(showMenuIndex === i ? undefined : i)}
      deleteWorkout={() => deleteWorkout(i)}
    />
  ));

  return (
    <React.Fragment>
      {historyTiles}
      <BottomSpace />
    </React.Fragment>
  );
};

interface DispatchProps {
  deleteWorkout: (i: number) => ReduxAction<number>
}

const mapDispatchToProps: DispatchProps = ({
  deleteWorkout: index => ({
    type: DELETE_WORKOUT,
    payload: index,
  }),
});

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(ActivityHistoryList);
