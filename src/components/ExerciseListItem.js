import React from 'react';
import styled from 'styled-components';
import { Badge } from '../assets/SVGs';
import { checkAllSetsAreComplete } from '../helpers/functions';
import { exercisePropTypeShape } from '../helpers/data';
import { purple } from '../helpers/constants';

const ExerciseListItemWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin: 8px 0;
`;

const fontStyle = `
  font-weight: 400;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
`;

const ExerciseName = styled.h5`
  display: flex;
  align-items: baseline;
  flex-basis: 40%;
  ${fontStyle}
  font-size: ${({ small }) => small ? '13px' : '16px'};

  @media (max-width: 374px) {
    font-size: 14px;
    font-size: ${({ small }) => small ? '12px' : '14px'};
  }
`;

const Weight = styled.p`
  ${fontStyle}
  font-size: ${({ small }) => small ? '13px' : '16px'};
  flex-grow: 1;
  text-align: right;

  @media (max-width: 374px) {
    font-size: 14px;
    font-size: ${({ small }) => small ? '12px' : '14px'};
  }
`;

const SetsWrapper = styled.div`
  display: flex;
  flex-basis: 40%;
  ${fontStyle}
  font-size: ${({ small }) => small ? '13px' : '16px'};

  @media (max-width: 374px) {
    font-size: 14px;
    font-size: ${({ small }) => small ? '12px' : '14px'};
  }

  span {
    flex-basis: ${({ small }) => small ? '18px' : '22px'};
    width: 100%;
    text-align: center;
    border-right: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    color: ${({ showAllSets, small }) => showAllSets && !small ? 'lightgrey' : 'initial'};
  }

  span:last-child {
    border: none;
    border-bottom: 1px solid lightgrey;
  }
`;

const ExerciseListItem = ({ small, showAllSets, sets, name, weightInKilos }) => {
  const setContainers = sets.map(({ max, completed }, i) => (
    <span key={i}>
      {completed !== undefined ? completed : (showAllSets ? max : '-')}
    </span>
  ));

  const allSetsComplete = checkAllSetsAreComplete(sets);

  return (
    <ExerciseListItemWrapper key={name}>
      <ExerciseName small={small}>
        {allSetsComplete &&
          <Badge style={{
            marginRight: '4px',
            width: 13,
            height: 13,
            fill: purple,
            overflow: 'visible',
            transform: 'translateY(1px)',
          }}/>
        }
        {name}
      </ExerciseName>
      <SetsWrapper showAllSets={showAllSets} small={small}>
        {setContainers}
      </SetsWrapper>
      <Weight small={small}>{weightInKilos}kg</Weight>
    </ExerciseListItemWrapper>
  );
};

ExerciseListItem.propTypes = exercisePropTypeShape;

export default ExerciseListItem;

