import React from 'react';
import {
  WeightedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import IncrementDecrementPanel from './IncrementDecrementPanel';

interface Props {
  activity: WeightedActivity;
}

const HiddenArea: React.FC<Props> = ({
  activity: {
    repsGoal,
    weightInKilos,
  },
}) => {
  return (
    <React.Fragment>
      <IncrementDecrementPanel
        isRepetitions
        displayedValue={repsGoal}
        label={'Reps'}
      />
      <IncrementDecrementPanel
        displayedValue={weightInKilos}
        label={'kg'}
      />
    </React.Fragment>
  );
};

export default HiddenArea;
