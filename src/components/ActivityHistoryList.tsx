import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  ACTIVITY_PAGE,
  SET_WINDOW_SCROLL,
  DELETE_WORKOUT,
} from '../helpers/constants';
import ActivityHistoryTile from './ActivityHistoryTile';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const BottomSpace = styled.div`
  height: 200px;
`;

const RoundCorneredTop = styled.div`
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  background-color: white;
  padding-top: 24px;
`;

interface OwnProps {
  history: Workout[];
}

type Props = OwnProps & DispatchProps;

const ActivityHistoryList: React.FC<Props> = ({
  history,
  deleteWorkout,
  setWindowScroll,
}) => {
  // undefined is used to denote no tile in list is selected
  const [ showMenuIndex, setShowMenuIndex ] = useState(undefined);

  const historyTiles = history.map((w, i) => (
    <ActivityHistoryTile
      key={w.finishTime}
      workout={w}
      showMenu={showMenuIndex === i}
      position={i}
      toggleMenu={() => {
        setShowMenuIndex(showMenuIndex === i ? undefined : i);
        setWindowScroll(window.scrollY);
      }}
      deleteWorkout={() => deleteWorkout(i)}
    />
  ));

  return (
    <RoundCorneredTop>
      {historyTiles}
      <BottomSpace />
    </RoundCorneredTop>
  );
};

interface DispatchProps {
  deleteWorkout: (i: number) => ReduxAction<number>;
  setWindowScroll: (scrollY: number) => ReduxAction<{
    scrollY: number,
    page: string
  }>;
}

const mapDispatchToProps: DispatchProps = ({
  setWindowScroll: scrollY => ({
    type: SET_WINDOW_SCROLL,
    payload: {
      scrollY,
      page: ACTIVITY_PAGE,
    },
  }),
  deleteWorkout: index => ({
    type: DELETE_WORKOUT,
    payload: index,
  }),
});

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(ActivityHistoryList);
