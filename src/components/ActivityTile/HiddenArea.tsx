import React from 'react';
import styled from 'styled-components';
import {
  WeightedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import IncrementDecrementPanel from './IncrementDecrementPanel';

interface Props {
  activity: WeightedActivity;
}

const MainValue = styled.span`
  font-size: 32px;
  font-weight: 800;
`;

const HiddenArea: React.FC<Props> = ({
  activity: {
    repsGoal,
    weightInKilos,
    repsAchieved,
  },
}) => {
  return (
    <React.Fragment>
      <IncrementDecrementPanel>
        <p>
          <MainValue>{weightInKilos}</MainValue>
        </p>
        <p>kg</p>
      </IncrementDecrementPanel>
      <IncrementDecrementPanel>
        <p>
          <MainValue>{repsAchieved || repsGoal}</MainValue>
          {`/${repsGoal}`}
        </p>
        <p>Reps</p>
      </IncrementDecrementPanel>
    </React.Fragment>
  );
};

export default HiddenArea;
