import React, { createContext, useState } from 'react';
import { connect } from 'react-redux';
import { State } from '../helpers/types';
import { Workout } from '../reducers/workoutsReducer';

const SelectedExerciseContext = createContext<UseSelectedExercise>(null);

export interface SelectedExercise {
  groupId: string | null;
  index: number | null;
}

interface UseSelectedExercise {
  selectedExercise: SelectedExercise;
  setSelectedExercise: (se: SelectedExercise) => void;
  selectNextExercise: () => void;
}

interface StateProps {
  activeWorkout: Workout;
}

const SelectedExerciseProviderComponent: React.FC<StateProps> = ({
  children,
  activeWorkout,
}) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [groupId, setGroupId] = useState('');

  const selectedExerciseValue: UseSelectedExercise = {
    selectedExercise: {
      index: exerciseIndex,
      groupId,
    },
    setSelectedExercise: selectedExercise => {
      setExerciseIndex(selectedExercise.index);
      setGroupId(selectedExercise.groupId);
    },
    selectNextExercise: () => {
      const { exerciseGroups = [] } = activeWorkout;
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

const mapStateToProps = (state: State): StateProps => ({
  activeWorkout: state.activeWorkout,
});

export const SelectedExerciseProvider = connect<StateProps, {}, {}>(
  mapStateToProps
)(SelectedExerciseProviderComponent);

export const useSelectedExercise = () => {
  const context = React.useContext(SelectedExerciseContext);
  if (context === undefined) {
    throw new Error('useSelectedExercise must be used within a SelectedExerciseProvider');
  }

  return context;
};
