import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  ACTIVITY_PAGE,
  DELETE_WORKOUT,
} from '../../helpers/constants';
import { getInitials, formatDate } from '../../helpers/functions';
import ActivityHistoryTile from './ActivityHistoryTile';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import {
  setWindowScroll as setWindowScrollActionCreator,
  SetWindowScroll,
} from '../../reducers/scrollYReducer';

const BottomSpace = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;

  & div {
    font-weight: 500;
  }

  & span {
    color: grey;
  }
`;

const RoundCorneredTop = styled.ul`
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  background-color: white;
  padding-top: 24px;
  list-style: none;
  margin: 0;
  padding-left: 0;
`;

interface OwnProps {
  history: Workout[];
}

type Props = OwnProps & DispatchProps & StateProps;

const ActivityHistoryList: React.FC<Props> = ({
  history,
  deleteWorkout,
  setWindowScroll,
  firstName,
  lastName,
  useKilos,
  firstVisitDate,
}) => {
  // undefined is used to denote no tile in list is selected
  const [ showMenuIndex, setShowMenuIndex ] = useState(undefined);

  const historyTiles = history.map((w, i) => (
    <ActivityHistoryTile
      initials={getInitials(firstName, lastName)}
      key={w.finishTime}
      workout={w}
      showMenu={showMenuIndex === i}
      position={i}
      toggleMenu={() => {
        setShowMenuIndex(showMenuIndex === i ? undefined : i);
        setWindowScroll(window.scrollY, ACTIVITY_PAGE);
      }}
      deleteWorkout={() => deleteWorkout(i)}
      useKilos={useKilos}
      historyLink={i}
    />
  ));
  const { date, month, year } = formatDate(firstVisitDate);

  return (
    <RoundCorneredTop>
      {historyTiles}
      <BottomSpace>
        <div>Joined HBFF 🎉 </div>
        <span>on {date}, {month}, {year}</span>
      </BottomSpace>
    </RoundCorneredTop>
  );
};

interface StateProps {
  firstName: string;
  lastName: string;
  useKilos: boolean;
  firstVisitDate: number;
}

interface DispatchProps {
  deleteWorkout: (i: number) => ReduxAction<number>;
  setWindowScroll: SetWindowScroll;
}

const mapStateToProps = (state: State): StateProps => ({
  firstName: state.profile.firstName,
  lastName: state.profile.lastName,
  useKilos: state.settings.useKilos,
  firstVisitDate: state.profile.firstVisitDate,
});

const mapDispatchToProps: DispatchProps = ({
  setWindowScroll: setWindowScrollActionCreator,
  deleteWorkout: index => ({
    type: DELETE_WORKOUT,
    payload: index,
  }),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ActivityHistoryList);
