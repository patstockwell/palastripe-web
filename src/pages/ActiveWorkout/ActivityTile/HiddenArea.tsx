import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  animated,
  SpringValue
} from 'react-spring';
import styled from 'styled-components';
import {State, WeightedActivity} from '../../../helpers/types';
import {getOneRepMax, formatWeight} from '../../../helpers/functions';
import {IncrementDecrementPanel} from './IncrementDecrementPanel';
import {ButtonBase, ButtonStyleProps} from '../../../components/SharedStyles';
import {useActiveWorkout} from '../../../reducers/activeWorkoutReducer';
import {gutterWidth} from '../../../helpers/constants';

const MainValue = styled.span`
  font-size: 32px;
  font-weight: 800;
  margin: 0;
`;

const P = styled.p`
  margin: 0;
`;

const Button = styled(ButtonBase)<ButtonStyleProps>`
  display: block;
  margin: 16px auto 0;
`;

const OneRepMax = styled.p`
  margin: 0;
  margin-left: ${gutterWidth}px;
  font-size: 0.75em;
  color: gray;
  text-transform: uppercase;
`;

interface Props {
  activity: WeightedActivity;
  groupId: string;
  index: number;
  animatedStyles: {
    [x: string]: SpringValue<any>;
  };
  toggleShowHiddenArea: () => void;
}

export const HiddenArea: React.FC<Props> = ({
  animatedStyles,
  index,
  groupId,
  activity: {
    repsGoal,
    weightInKilos,
    repsAchieved,
    completed,
  },
  toggleShowHiddenArea,
}) => {
  const useKilos = useSelector((state: State) => state.settings.useKilos);
  const {
    toggleSetComplete,
    changeReps,
    changeWeight,
    setWeight,
  } = useActiveWorkout();

  const handleButtonClick = (completed: boolean) => {
    if (completed) {
      toggleShowHiddenArea();
    } else {
      toggleSetComplete({ completed: true, groupId, index });
    }
  };

  const {weight, label} = formatWeight(weightInKilos, useKilos);

  return (
    <animated.div style={{
      height: animatedStyles.height,
      opacity: animatedStyles.opacity,
      cursor: 'default',
    }}>

      <OneRepMax>
        1RM: {getOneRepMax(repsAchieved, weight) || '~'} {label}
      </OneRepMax>
      <IncrementDecrementPanel
        handleDecrement={() => changeWeight({ shouldIncrement: false, index, groupId })}
        handleIncrement={() => changeWeight({ shouldIncrement: true, index, groupId })}
        percentageComplete={1}
      >
        <EditableInput
          value={weight}
          onBlurOrEnter={(weight: number) => setWeight({ weight, groupId, index })}
          allowIntegersOnly={false}
        >
          <MainValue>{weight}</MainValue>
        </EditableInput>
        <P>{label}</P>
      </IncrementDecrementPanel>

      <IncrementDecrementPanel
        handleDecrement={() => changeReps({ index, groupId, newReps: repsAchieved - 1 })}
        handleIncrement={() => changeReps({ index, groupId, newReps: repsAchieved + 1 })}
        percentageComplete={repsGoal ? repsAchieved / repsGoal : 1}
      >
        <P>
          <EditableInput
            value={repsAchieved}
            onBlurOrEnter={(reps: number) => changeReps({ newReps: reps, groupId, index })}
            allowIntegersOnly
          >
            <MainValue>{repsAchieved}</MainValue>
            {repsGoal && `/${repsGoal}`}
          </EditableInput>
        </P>
        <P>Reps</P>
      </IncrementDecrementPanel>

      <Button
        onClick={() => handleButtonClick(completed)}
        background={completed && 'grey'}
      >{completed ? 'Done' : 'Finish set & rest'}</Button>
    </animated.div>
  );
};

const EditableInputButton = styled.button`
  padding: 0;
  border: none;
  background: none;
`;

const Input = styled.input`
  padding: 0;
  background: none;
  border: none;
  width: 100%;
  text-align: center;
  font-size: 32px;
  font-weight: 800;
`;

interface EditableInputProps {
  value: number;
  onBlurOrEnter: (updatedValue: number) => void;
  allowIntegersOnly: boolean;
}

const EditableInput: React.FC<EditableInputProps> = ({
  value: initialValue,
  onBlurOrEnter,
  allowIntegersOnly,
  children,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleBlurOrEnter = () => {
    const parsedValue = allowIntegersOnly
      ? Number.parseInt(inputValue, 10)
      : Number.parseFloat(inputValue);
    // Only update if the input has changed and is a valid number.
    const canUpdate = inputValue !== '' && !isNaN(parsedValue);
    onBlurOrEnter(canUpdate ? parsedValue : initialValue);
    // reset the input
    setInputValue('');
    setShowInput(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.which === 13) { // if enter key is pressed
      handleBlurOrEnter();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      {showInput ? (
        <Input
          type="number"
          pattern="[0-9]*"
          inputMode="decimal"
          onBlur={handleBlurOrEnter}
          autoFocus
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <EditableInputButton onClick={() => setShowInput(true)}>
          {children}
        </EditableInputButton>
      )}
    </>
  );
};
