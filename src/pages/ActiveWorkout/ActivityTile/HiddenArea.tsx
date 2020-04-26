import React, { ReactText } from 'react';
import { useSelector } from 'react-redux';
import {
  animated,
  OpaqueInterpolation,
  AnimatedValue,
} from 'react-spring';
import styled from 'styled-components';
import { State, WeightedActivity } from '../../../helpers/types';
import { convertWeight } from '../../../helpers/functions';
import IncrementDecrementPanel from './IncrementDecrementPanel';
import { buttonStyle } from '../../../components/SharedStyles';
import { useRestTimer } from '../../../context/useRestTimer';
import {
  useToggleSetComplete,
  useDecrementWeight,
  useIncrementWeight,
  useChangeReps,
} from '../../../reducers/activeWorkoutReducer';

const MainValue = styled.span`
  font-size: 32px;
  font-weight: 800;
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
  animatedStyles: AnimatedValue<{
    height: ReactText,
    opacity: OpaqueInterpolation<any>,
  }>;
}

const HiddenArea: React.FC<Props> = ({
  animatedStyles,
  index,
  groupId,
  activity: {
    repsGoal,
    weightInKilos,
    repsAchieved,
    completed,
    restPeriodInSeconds,
  },
}) => {
  const useKilos = useSelector((state: State) => state.settings.useKilos);
  // TODO: Can we bind the groupId and index here?
  const toggleSetComplete = useToggleSetComplete()
  const changeReps = useChangeReps();
  const incrementWeight = useIncrementWeight();
  const decrementWeight = useDecrementWeight();
  const { showTimer } = useRestTimer();

  const handleButtonClick = () => {
    toggleSetComplete({ completed: true, groupId, index });
    showTimer(restPeriodInSeconds);
  };

  return (
    <animated.div style={{
      height: animatedStyles.height,
      opacity: animatedStyles.opacity,
      cursor: 'default',
    }}>
      <IncrementDecrementPanel
        handleDecrement={() => decrementWeight({ index, groupId })}
        handleIncrement={() => incrementWeight({ index, groupId })}
        percentageComplete={1}
      >
        <p>
          <MainValue>{convertWeight(weightInKilos, useKilos)}</MainValue>
        </p>
        <p>{useKilos ? 'kg' : 'lbs'}</p>
      </IncrementDecrementPanel>
      <IncrementDecrementPanel
        handleDecrement={() => changeReps({ index, groupId, increment: -1 })}
        handleIncrement={() => changeReps({ index, groupId, increment: 1 })}
        percentageComplete={repsAchieved / repsGoal}
      >
        <p>
          <MainValue>{repsAchieved}</MainValue>
          {`/${repsGoal}`}
        </p>
        <p>Reps</p>
      </IncrementDecrementPanel>

      <Button
        onClick={handleButtonClick}
        background={completed && 'grey'}
      >{completed ? 'Completed' : 'Finish set & rest'}</Button>
    </animated.div>
  );
};

export default HiddenArea;
