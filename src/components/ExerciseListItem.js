import React from 'react';
import styled from 'styled-components';
import { exercisePropTypeShape } from '../helpers/data';

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

  return (
    <ExerciseListItemWrapper key={name}>
      <ExerciseName small={small}>{name}</ExerciseName>
      <SetsWrapper small={small}>
        {setContainers}
      </SetsWrapper>
      <Weight small={small}>{weightInKilos}kg</Weight>
    </ExerciseListItemWrapper>
  );
};

ExerciseListItem.propTypes = exercisePropTypeShape;

export default ExerciseListItem;

