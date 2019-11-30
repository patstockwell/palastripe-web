import React, { useState } from 'react';
import styled from 'styled-components';
import EditIconPencil from '../assets/svg/EditIconPencil';
import { workoutHeroWindowStyle, workoutTitleStyle } from './SharedStyles';
import { charcoal } from '../helpers/constants';

const HeightNormalizer = styled.div`
  min-height: 140px;
`;

const Input = styled.input`
  ${workoutTitleStyle}
  background-color: white;
  border: none;
  width: 90%;
  max-width: 400px;

  &::placeholder {
    color: darkgrey;
  }
`;

const WorkoutName = styled.p`
  ${workoutTitleStyle}
`;

const Window = styled.div<{ colour?: string }>`
  ${workoutHeroWindowStyle}
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: white;
  text-transform: none;
`;

interface Props {
  name: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const placeholder = 'Workout name';

const EditWorkoutHero: React.FC<Props> = ({ name, handleInputChange }) => {
  const [ showInput, setShowInput ] = useState(false);
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.which === 13) { // if enter key is pressed
      setShowInput(false);
    }
  };

  return (
    <Window colour={charcoal}>
      <HeightNormalizer>
        {showInput ? (
          <Input
            onBlur={() => setShowInput(false)}
            autoFocus
            value={name}
            onChange={handleInputChange}
            placeholder={placeholder}
            onKeyPress={handleKeyPress}
          />
        ) : (
          <WorkoutName onClick={() => setShowInput(true)}>
            <Button>
              <EditIconPencil
                style={{ fill: 'white', marginRight: '8px' }}
                width={12}
                height={12}
              />
              Edit
            </Button>
            <br />
            {name ? name : placeholder}
          </WorkoutName>
        )}
      </HeightNormalizer>
    </Window>
  );
};

export default EditWorkoutHero;
