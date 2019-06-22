import React, {
  ReactText, // eslint-disable-line no-unused-vars
} from 'react';
import { connect } from 'react-redux';
import {
  Dispatch, // eslint-disable-line no-unused-vars
} from 'redux';
import { animated,
  AnimatedValue, // eslint-disable-line no-unused-vars
} from 'react-spring';
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
  groupId: string;
  index: number;
  animatedStyles: AnimatedValue<{ height: ReactText }>;
}

type Props = DispatchProps & OwnProps;

const HiddenArea: React.FC<Props> = ({
  animatedStyles,
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
    <animated.div style={{
      height: animatedStyles.height,
      cursor: 'default',
    }}>
      <IncrementDecrementPanel
        handleDecrement={() => changeWeight(-2.5)}
        handleIncrement={() => changeWeight(2.5)}
        percentageComplete={1}
      >
        <p>
          <MainValue>{weightInKilos}</MainValue>
        </p>
        <p>kg</p>
      </IncrementDecrementPanel>
      <IncrementDecrementPanel
        handleDecrement={() => changeReps(-1)}
        handleIncrement={() => changeReps(1)}
        percentageComplete={reps / repsGoal}
      >
        <p>
          <MainValue>{reps}</MainValue>
          {`/${repsGoal}`}
        </p>
        <p>Reps</p>
      </IncrementDecrementPanel>
    </animated.div>
  );
};

type ChangeSetAction = ReduxAction<SingleSetAction & { value: number }>;
type ChangeSetDispatch = Dispatch<ChangeSetAction>;

const mapDispatchToProps = (
  dispatch: ChangeSetDispatch,
  ownProps: OwnProps
): DispatchProps => ({
  changeWeight: (weight: number) => dispatch({
    type: CHANGE_WEIGHT,
    payload: {
      groupId: ownProps.groupId,
      index: ownProps.index,
      value: weight,
    },
  }),
  changeReps: (increment: number) => dispatch({
    type: CHANGE_REPS,
    payload: {
      groupId: ownProps.groupId,
      index: ownProps.index,
      value: increment,
    },
  }),
});

interface DispatchProps {
  changeWeight: (weight: number) => ChangeSetAction;
  changeReps: (increment: number) => ChangeSetAction;
}

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(HiddenArea);
