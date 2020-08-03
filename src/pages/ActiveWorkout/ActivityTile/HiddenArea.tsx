import React from 'react';
import { useSelector } from 'react-redux';
import {
  animated,
  SpringValue
} from 'react-spring';
import styled from 'styled-components';
import { State, WeightedActivity } from '../../../helpers/types';
import { convertWeight } from '../../../helpers/functions';
import { IncrementDecrementPanel } from './IncrementDecrementPanel';
import { buttonStyle } from '../../../components/SharedStyles';
import { useActiveWorkout } from '../../../reducers/activeWorkoutReducer';

const MainValue = styled.span`
  font-size: 32px;
  font-weight: 800;
  margin: 0;
`;

const P = styled.p`
  margin: 0;
`;

const Button = styled.button<{  background?: string; fontColour?: string; }>`
  ${buttonStyle}
  display: block;
  margin: 16px auto 0;
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
  const { toggleSetComplete, changeReps, changeWeight } = useActiveWorkout();

  const handleButtonClick = (completed: boolean) => {
    if (completed) {
      toggleShowHiddenArea();
    } else {
      toggleSetComplete({ completed: true, groupId, index });
    }
  };

  return (
    <animated.div style={{
      height: animatedStyles.height,
      opacity: animatedStyles.opacity,
      cursor: 'default',
    }}>
      <IncrementDecrementPanel
        handleDecrement={() => changeWeight({ shouldIncrement: false, index, groupId })}
        handleIncrement={() => changeWeight({ shouldIncrement: true, index, groupId })}
        percentageComplete={1}
      >
        <MainValue>{convertWeight(weightInKilos, useKilos)}</MainValue>
        <P>{useKilos ? 'kg' : 'lbs'}</P>
      </IncrementDecrementPanel>
      <IncrementDecrementPanel
        handleDecrement={() => changeReps({ index, groupId, increment: -1 })}
        handleIncrement={() => changeReps({ index, groupId, increment: 1 })}
        percentageComplete={repsGoal ? repsAchieved / repsGoal : 1}
      >
        <P>
          <MainValue>{repsAchieved}</MainValue>
          {repsGoal && `/${repsGoal}`}
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
