import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

import { getInitials, formatDate } from '../../helpers/functions';
import ActivityHistoryTile from './ActivityHistoryTile';
import { State } from '../../helpers/types';
import { Workout } from '../../reducers/workoutsReducer';
import { useDeleteWorkout } from '../../reducers/historyReducer';
import {
  useActivityHistoryLength,
} from '../../context/useActivityHistoryLength';

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

interface Props {
  history: Workout[];
}

export const ActivityHistoryList: React.FC<Props> = ({ history }) => {
  // undefined is used to denote no tile in list is selected
  const [showMenuIndex, setShowMenuIndex] = useState(undefined);
  const deleteWorkout = useDeleteWorkout();
  const {
    profile: { firstVisitDate, lastName, firstName },
    settings: { useKilos },
  } = useSelector((state: State) => state);
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: '200px',
  });
  const { viewMore, listLength } = useActivityHistoryLength();

  useEffect(() => {
    if (inView) {
      viewMore();
    }
  }, [inView]);

  const historyTiles = history.slice(0, listLength).map((w, i) => (
    <ActivityHistoryTile
      initials={getInitials(firstName, lastName)}
      key={w.finishTime}
      workout={w}
      showMenu={showMenuIndex === i}
      toggleMenu={() => {
        setShowMenuIndex(showMenuIndex === i ? undefined : i);
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
      <BottomSpace ref={ref}>
        {listLength < history.length && (
          <p>loading...</p>
        )}
        <div>Joined HBFF 🎉 </div>
        <span>on {date} {month}, {year}</span>
      </BottomSpace>
    </RoundCorneredTop>
  );
};
