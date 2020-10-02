import React, {useState} from 'react';
import {SelectedExercise} from './useSelectedExercise';
import {ONE_SECOND} from '../helpers/constants';
import {useInterval} from '../helpers/functions';

const RestTimerContext = React.createContext<ConsumerValue>(null);

interface ConsumerValue {
  activeRestTimer: SelectedExercise;
  setActiveRestTimer: (se: SelectedExercise) => void;
  clearRestTimer: () => void;
  count: number;
}

const RestTimerProvider: React.FC = ({children}) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [groupId, setGroupId] = useState('');
  const [timeAtZero, setTimeAtZero] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  // The timer tick is created by storing the time at zero (when the component
  // first mounts) and then at each interval taking the difference between the
  // current time and the zero time.
  useInterval(() => (
    setCount(Math.floor((Date.now() - timeAtZero) / 1000))
  ), timeAtZero ? ONE_SECOND : null);

  const value: ConsumerValue = {
    activeRestTimer: {
      index: exerciseIndex,
      groupId,
    },
    setActiveRestTimer: activeRestTimer => {
      setExerciseIndex(activeRestTimer.index);
      setGroupId(activeRestTimer.groupId);
      setTimeAtZero(Date.now());
      setCount(0);
    },
    clearRestTimer: () => {
      setExerciseIndex(0);
      setGroupId('');
      setTimeAtZero(null);
      setCount(0);
    },
    count,
  };

  return (
    <RestTimerContext.Provider value={value}>
      {children}
    </RestTimerContext.Provider>
  );
};

const useRestTimer = () => {
  const context = React.useContext(RestTimerContext);
  if (!context) {
    throw new Error('useRestTimer must be used within a RestTimerProvider');
  }

  return context;
};

export { RestTimerProvider, useRestTimer };
