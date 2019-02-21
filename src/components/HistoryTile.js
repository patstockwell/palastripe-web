import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';
import LayoutTile from './LayoutTile';
import ExerciseList from './ExerciseList';
import { fadedYellow } from '../helpers/constants';
import { ForwardArrowBlack } from '../assets/SVGs';

const Title = styled.div`
  flex-basis: 88px;
  margin-right: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 80px;
`;

const ExerciseListWrapper = styled.div`
  flex: 1;
`;

const LayoutWrapper = styled(LayoutTile)`
  display: flex;
  animation: ${({ animation }) => animation} 6s ease-out;
`;

const Date = styled.h3`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: grey;
`;

const ForwardArrowPanel = styled.div`
  border-radius: 0 3px 3px 0;
  padding: 2px;
  display: flex;
  align-items: center;
  width: 12px;
  margin-left: 5px;
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

const HistoryTile =
  ({ onGoing, workoutRoutine: { exercises, date, order }}) => {

    const exerciseTiles = order.map((e, i) =>
      <ExerciseList {...exercises[e]} key={i} />
    );

    const ActiveExerciseTitle = onGoing ? 'On Going' : 'Up Next';
    const isRecent = moment(date).isAfter(moment().subtract(3, 'second'));
    const backgroundColour = date && isRecent ? highlightRecent : undefined;

    return (
      <LayoutWrapper animation={backgroundColour}>
        <Title>
          <Date>{date ? moment(date).format('dddd') : ActiveExerciseTitle}</Date>
          <Date>{date ? moment(date).format('D MMM') : ''}</Date>
        </Title>
        <ExerciseListWrapper>
          {exerciseTiles}
        </ExerciseListWrapper>
        <ForwardArrowPanel>
          {!date && <ForwardArrowBlack />}
        </ForwardArrowPanel>
      </LayoutWrapper>
    );
  };

HistoryTile.propTypes = {
  onGoing: PropTypes.bool,
  workoutRoutine: PropTypes.object,
};

const mapStateToProps = state => ({
  onGoing: state.activeWorkoutOnGoing,
});

export default connect(mapStateToProps)(HistoryTile);

