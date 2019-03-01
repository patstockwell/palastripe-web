import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import LayoutTile from './LayoutTile';
import ExerciseListItem from './ExerciseListItem';
import { orange, green } from '../helpers/constants';
import { ForwardArrow } from '../assets/SVGs';
import { calculateWorkoutTime } from './ScrollingWorkoutTile';

const Title = styled.div`
  display: flex;
  align-items: center;
  margin: 8px;
`;

const ExerciseListWrapper = styled.div`
  margin: 12px 8px;
  flex: 1;
`;

const ForwardArrowPanel = styled.div`
  animation: ${({ animation }) => animation} 4s linear;
  display: flex;
  align-items: center;
`;

const Svg = styled.svg`
  width: 8px;
  height: 8px;
  margin-right: 4px;
  fill: ${({ colour }) => colour};
  overflow: visible;
`;

const Circle = styled.circle`
  cx: 4;
  cy: 4;
  r: 4;
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: lightgray;
  margin: 0 8px;
`;

const TileHeading = styled.h2`
  flex-grow: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;

const ForwardText = styled.p`
  font-size: 14px;
  color: grey;
  margin: 4px;
`;

const WorkoutNameWrapper = styled.div`
  margin: 12px 8px;
  display: flex;
  align-items: baseline;
`;

const WorkoutName = styled.p`
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
`;

const WorkoutDetail = styled.p`
  color: grey;
  font-size: 14px;
  margin-left: 8px;
`;

const indicateStart = keyframes`
  90% {
    transform: translateX(0);
  }

  95% {
    transform: translateX(-8px);
  }

  100% {
    transform: translateX(0);
  }
`;

const UpNextTile = ({ emptyHistory, onGoing, workout }) => {
  const { exercises, name, order } = workout;
  const exerciseTiles = order.map((e, i) =>
    <ExerciseListItem showAllSets={!onGoing} {...exercises[e]} key={i} />
  );
  const colour = onGoing ? orange : green;
  const minutes = calculateWorkoutTime(order.map(e => exercises[e]));

  return (
    <LayoutTile>
      <Title>
        <TileHeading>{onGoing ? 'On Going' : 'Up Next'}</TileHeading>
        <ForwardArrowPanel animation={emptyHistory && indicateStart}>
          <ForwardText>{onGoing ? 'Continue' : 'Start'}</ForwardText>
          <ForwardArrow style={{ fill: 'grey', height: '12px', margin: '0 -14px 0 -4px'}} />
          <ForwardArrow style={{ fill: 'grey', height: '12px' }} />
        </ForwardArrowPanel>
      </Title>
      <Hr />
      <WorkoutNameWrapper>
        <Svg colour={colour}>
          <Circle />
        </Svg>
        <WorkoutName>
          {name}
        </WorkoutName>
        <WorkoutDetail>&asymp; {minutes}min</WorkoutDetail>
      </WorkoutNameWrapper>
      <ExerciseListWrapper>
        {exerciseTiles}
      </ExerciseListWrapper>
    </LayoutTile>
  );
};

UpNextTile.propTypes = {
  onGoing: PropTypes.bool,
  emptyHistory: PropTypes.bool,
  workout: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  onGoing: state.activeWorkout.onGoing,
  emptyHistory: state.history.length === 0,
});

export default connect(mapStateToProps)(UpNextTile);

