import React from 'react';
import styled from 'styled-components';
import { exercisePropTypeShape } from '../helpers/data';

const ExerciseListItemWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin: 6px 0;
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
  flex-basis: 51%;
  ${fontStyle}
  font-size: ${({ small }) => small ? '13px' : '16px'};

  @media (max-width: 374px) {
    font-size: 14px;
    font-size: ${({ small }) => small ? '12px' : '14px'};
  }
`;

const Sets = styled.p`
  flex-basis: 28%;
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

const ExerciseList = ({ small, showAllSets, sets, name, weightInKilos }) => {
  const setCount = sets.map(({ max, completed }) => (
    completed ? completed : (showAllSets ? max : '-')
  )).join('/');

  return (
    <ExerciseListItemWrapper key={name}>
      <ExerciseName small={small}>{name}</ExerciseName>
      <Sets small={small}>{setCount}</Sets>
      <Weight small={small}>{weightInKilos}kg</Weight>
    </ExerciseListItemWrapper>
  );
};

ExerciseList.propTypes = exercisePropTypeShape;

export default ExerciseList;

