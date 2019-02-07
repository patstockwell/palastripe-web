import React from 'react';
import styled from 'styled-components';

const Set = styled.button`
  border-radius: 50%;
  background-color: ${({ theme: { background } }) => background};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 5px;
  border: 3px solid ${({ theme: { border } }) => border};
  font-size: 20px;
`;

const SetOfReps = () => {
};

export default SetOfReps;

