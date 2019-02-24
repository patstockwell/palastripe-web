import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';
import LayoutTile from './LayoutTile';
import ExerciseList from './ExerciseList';
import { fadedYellow } from '../helpers/constants';

const Title = styled.div`
`;

const ExerciseListWrapper = styled.div`
  margin: 12px 8px;
  flex: 1;
`;

const LayoutWrapper = styled(LayoutTile)`
  animation: ${({ animation }) => animation} 4s ease-out;
`;

const Date = styled.h3`
  margin: 8px;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: grey;
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

const HistoryTile = ({ workout: { exercises, date, order }}) => {

  const exerciseList = order.map((e, i) =>
    <ExerciseList {...exercises[e]} key={i} />
  );

  const isRecent = moment(date).isAfter(moment().subtract(3, 'second'));
  const backgroundColour = date && isRecent ? highlightRecent : undefined;

  return (
    <LayoutWrapper animation={backgroundColour}>
      <Title>
        <Date>{moment(date).format('dddd')} {moment(date).format('D MMM')}</Date>
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

