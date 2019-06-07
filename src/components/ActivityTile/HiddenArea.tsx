import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  SingleSetAction, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  WeightedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { CHANGE_WEIGHT, CHANGE_REPS } from '../../helpers/constants';
import IncrementDecrementPanel from './IncrementDecrementPanel';

const MainValue = styled.span`
  font-size: 32px;
  font-weight: 800;
`;

interface OwnProps {
  activity: WeightedActivity;
  group: string;
  index: number;
}

type Props = DispatchProps & OwnProps;

const HiddenArea: React.FC<Props> = ({
  changeReps,
  changeWeight,
  activity: {
    repsGoal,
    weightInKilos,
    repsAchieved,
  },
}) => {
  const reps = repsAchieved !== undefined ? repsAchieved : repsGoal;

  return (
    <React.Fragment>
      <IncrementDecrementPanel
        handleDecrement={() => changeWeight(-2.5)}
        handleIncrement={() => changeWeight(2.5)}
      >
        <p>
          <MainValue>{weightInKilos}</MainValue>
        </p>
        <p>kg</p>
      </IncrementDecrementPanel>
      <IncrementDecrementPanel
        handleDecrement={() => changeReps(-1)}
        handleIncrement={() => changeReps(1)}
      >
        <p>
          <MainValue>{reps}</MainValue>
          {`/${repsGoal}`}
        </p>
        <p>Reps</p>
      </IncrementDecrementPanel>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch, ownProps: OwnProps) => ({
  changeWeight: (weight: number) => dispatch ({
    type: CHANGE_WEIGHT,
    payload: {
      group: ownProps.group,
      index: ownProps.index,
      value: weight,
    },
  }),
  changeReps: (increment: number) => dispatch({
    type: CHANGE_REPS,
    payload: {
      group: ownProps.group,
      index: ownProps.index,
      value: increment,
    },
  }),
});

interface DispatchProps {
  changeWeight: (weight: number) => ReduxAction<SingleSetAction & { value: number }>;
  changeReps: (increment: number) => ReduxAction<SingleSetAction & { value: number }>;
}

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(HiddenArea);
