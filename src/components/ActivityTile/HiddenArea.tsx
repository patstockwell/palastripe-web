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
        number={repsGoal}
        label={'Reps'}
      />
      <IncrementDecrementPanel
        number={weightInKilos}
        label={'kg'}
      />
    </React.Fragment>
  );
};

export default HiddenArea;
