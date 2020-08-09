import React, {useState} from 'react';
import {SelectedExercise} from './useSelectedExercise';

const RestTimerContext = React.createContext<ConsumerValue>(null);

interface ConsumerValue {
  activeRestTimer: SelectedExercise;
  setActiveRestTimer: (se: SelectedExercise) => void;
}

const RestTimerProvider: React.FC = ({children}) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [groupId, setGroupId] = useState('');
  const value: ConsumerValue = {
    activeRestTimer: {
      index: exerciseIndex,
      groupId,
    },
    setActiveRestTimer: activeRestTimer => {
      setExerciseIndex(activeRestTimer.index);
      setGroupId(activeRestTimer.groupId);
    },
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
