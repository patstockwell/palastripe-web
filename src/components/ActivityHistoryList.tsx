import React from 'react';
import styled from 'styled-components';
import { gutterWidth } from '../helpers/constants';
import ActivityHistoryTile from './ActivityHistoryTile';
import {
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const NoHistoryMessage = styled.div`
  padding: ${gutterWidth}px;
`;

const EmptyHistoryTile = styled.div`
  height: 200px;
`;

interface Props {
  history: Workout[];
}

const ActivityHistoryList: React.FC<Props> = ({ history }) => {
  const historyTiles = history.map(w => (
    <ActivityHistoryTile key={w.finishTime} workout={w} />
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

export default ActivityHistoryList;
