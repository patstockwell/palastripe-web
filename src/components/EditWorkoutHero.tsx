import React, { useState } from 'react';
import styled from 'styled-components';
import EditIconPencil from '../assets/svg/EditIconPencil';
import { workoutHeroWindowStyle, workoutTitleStyle } from './SharedStyles';

const Input = styled.input`
  ${workoutTitleStyle}
  background-color: white;
  border: none;
`;

const WorkoutName = styled.p`
  ${workoutTitleStyle}
`;

const Window = styled.div`
  ${workoutHeroWindowStyle}
`;

interface Props {
  name: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditWorkoutHero: React.FC<Props> = ({ name, handleInputChange }) => {
  const [ nameIsEditable, setNameIsEditable ] = useState(false);

  return (
    <Window>
      {nameIsEditable ? (
        <Input onBlur={() => setNameIsEditable(false)} autoFocus value={name} onChange={handleInputChange} />
      ) : (
        <WorkoutName onClick={() => setNameIsEditable(true)}>
          <EditIconPencil
            style={{ fill: 'white', marginRight: '8px' }}
            width={16}
            height={16}
          />
          {name}
        </WorkoutName>
      )}
    </Window>
  );
};

export default EditWorkoutHero;
