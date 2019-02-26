import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutTile from './LayoutTile';
import ExerciseListItem from './ExerciseListItem';
import { orange, green } from '../helpers/constants';
import { ForwardArrow } from '../assets/SVGs';

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

const WorkoutNameOverflow = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const WorkoutName = styled.h2`
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

const UpNextTile = ({ onGoing, workout: { exercises, name, order }}) => {
  const exerciseTiles = order.map((e, i) =>
    <ExerciseListItem {...exercises[e]} key={i} />
  );
  const colour = onGoing ? orange : green;

  return (
    <LayoutTile>
      <Title>
        <Svg colour={colour}>
          <Circle />
        </Svg>
        <WorkoutNameOverflow>
          <WorkoutName>{name}</WorkoutName>
        </WorkoutNameOverflow>
        <ForwardArrowPanel>
          <ForwardText>{onGoing ? 'On Going' : 'Start'}</ForwardText>
          <ForwardArrow style={{ height: '12px', margin: '0 -14px 0 -4px'}} />
          <ForwardArrow style={{ height: '12px' }} />
        </ForwardArrowPanel>
      </Title>
      <Hr />
      <ExerciseListWrapper>
        {exerciseTiles}
      </ExerciseListWrapper>
    </LayoutTile>
  );
};

UpNextTile.propTypes = {
  onGoing: PropTypes.bool,
  workout: PropTypes.object,
};

const mapStateToProps = state => ({
  onGoing: state.activeWorkout.onGoing,
});

export default connect(mapStateToProps)(UpNextTile);

