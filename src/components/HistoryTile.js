import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';
import LayoutTile from './LayoutTile';
import ExerciseListItem from './ExerciseListItem';
import { fadedYellow } from '../helpers/constants';

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WorkoutName = styled.h3`
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
`;

const NameWrapper = styled.div`
  margin: 8px;
  display: flex;
  align-items: center;
`;

const ExerciseListWrapper = styled.div`
  margin: 12px 8px;
  flex: 1;
`;

const LayoutWrapper = styled(LayoutTile)`
  animation: ${({ animation }) => animation} 4s ease-out;
`;

const TileDetail = styled.p`
  margin: 8px;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: grey;
`;

const Time = styled(TileDetail)`
  margin: 0 0 0 8px;
`;

const highlightRecent = keyframes`
  0% {
    background-color: ${fadedYellow};
  }

  10% {
    background-color: ${fadedYellow};
    transform: scale(1);
    box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.2);
  }

  13% {
    transform: scale(1.05);
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  }

  16% {
    transform: scale(1);
    box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.2);
  }

  100% {
    background-color: white;
  }
`;

const HistoryTile = ({ workout }) => {
  const { name, exercises, startTime, finishTime, order } = workout;
  const finish = moment(finishTime);
  const start = moment(startTime);
  const diff = finish.diff(start) < 0
    ? 0 : Math.round(finish.diff(start) / 1000 / 60);

  const exerciseList = order.map((e, i) =>
    <ExerciseListItem {...exercises[e]} key={i} />
  );

  const isRecent = finish.isAfter(moment().subtract(3, 'second'));
  const backgroundColour = finishTime && isRecent ? highlightRecent : undefined;

  return (
    <LayoutWrapper animation={backgroundColour}>
      <Title>
        <NameWrapper>
          <WorkoutName>{name}</WorkoutName>
          <Time>
            {diff}min
          </Time>
        </NameWrapper>
        <TileDetail>
          {`${finish.format('dddd')} ${finish.format('D MMM')}`}
        </TileDetail>
      </Title>
      <ExerciseListWrapper>
        {exerciseList}
      </ExerciseListWrapper>
    </LayoutWrapper>
  );
};

HistoryTile.propTypes = {
  workout: PropTypes.object,
};

export default HistoryTile;

