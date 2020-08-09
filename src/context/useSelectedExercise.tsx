import React, {createContext, useState} from 'react';
import {useSelector} from 'react-redux';
import {State} from '../helpers/types';

const SelectedExerciseContext = createContext<ConsumerValue>(null);

export interface SelectedExercise {
  groupId: string | null;
  index: number | null;
}

interface ConsumerValue {
  selectedExercise: SelectedExercise;
  setSelectedExercise: (se: SelectedExercise) => void;
  selectNextExercise: () => void;
}

export const SelectedExerciseProvider: React.FC = ({
  children,
}) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [groupId, setGroupId] = useState('');
  const {activeWorkout} = useSelector((state: State) => state);

  const selectedExerciseValue: ConsumerValue = {
    selectedExercise: {
      index: exerciseIndex,
      groupId,
    },
    setSelectedExercise: selectedExercise => {
      setExerciseIndex(selectedExercise.index);
      setGroupId(selectedExercise.groupId);
    },
    selectNextExercise: () => {
      const {exerciseGroups = []} = activeWorkout;
      const groupIndex = exerciseGroups.findIndex(g => g.id === groupId);
      const group = exerciseGroups[groupIndex];

      // if there is still another exercise in this list, then give me the next
      if (exerciseIndex + 1 < group.exercises.length) {
        setExerciseIndex(i => i + 1);
        return;
      }

      // else give me the first exercise in the next group (or false if no next)
      const nextGroup = exerciseGroups[groupIndex + 1];
      const newGroupId: string = nextGroup && nextGroup.id;
      setExerciseIndex(0);
      setGroupId(newGroupId);
      return;
    },
  };

  return (
    <SelectedExerciseContext.Provider value={selectedExerciseValue}>
      {children}
    </SelectedExerciseContext.Provider>
  );
};

export const useSelectedExercise = () => {
  const context = React.useContext(SelectedExerciseContext);
  if (!context) {
    throw new Error('useSelectedExercise must be used within a SelectedExerciseProvider');
  }

  return context;
};
