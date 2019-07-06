import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { DELETE_WORKOUT, gutterWidth } from '../helpers/constants';
import ActivityHistoryTile from './ActivityHistoryTile';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const NoHistoryMessage = styled.div`
  padding: ${gutterWidth}px;
`;

const EmptyHistoryTile = styled.div`
  height: 200px;
`;

interface OwnProps {
  history: Workout[];
}

type Props = OwnProps & DispatchProps;

const ActivityHistoryList: React.FC<Props> = ({ history, deleteWorkout }) => {
  // -1 is used to denote no tile in list is selected
  const [ showMenu, setShowMenu ] = useState(-1);

  const historyTiles = history.map((w, i) => (
    <ActivityHistoryTile
      key={w.finishTime}
      workout={w}
      showMenu={showMenu === i}
      toggleMenu={() => setShowMenu(showMenu === i ? -1 : i)}
      deleteWorkout={() => deleteWorkout(i)}
    />
  ));

  return (
    <React.Fragment>
      {historyTiles}
      {!historyTiles.length ? (
        <NoHistoryMessage>
          Your workout history will appear here
        </NoHistoryMessage>
      ) : (
        <EmptyHistoryTile />
      )}
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
