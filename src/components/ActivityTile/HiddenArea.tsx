import React, {
  ReactText, // eslint-disable-line no-unused-vars
} from 'react';
import { connect } from 'react-redux';
import {
  Dispatch, // eslint-disable-line no-unused-vars
} from 'redux';
import { animated,
  OpaqueInterpolation, // eslint-disable-line no-unused-vars
  AnimatedValue, // eslint-disable-line no-unused-vars
} from 'react-spring';
import styled from 'styled-components';
import {
  SingleSetAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  WeightedActivity, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { convertWeight } from '../../helpers/functions';
import {
  DECREMENT_WEIGHT,
  INCREMENT_WEIGHT,
  CHANGE_REPS,
} from '../../helpers/constants';
import IncrementDecrementPanel from './IncrementDecrementPanel';

const MainValue = styled.span`
  font-size: 32px;
  font-weight: 800;
`;

interface OwnProps {
  activity: WeightedActivity;
  groupId: string;
  index: number;
  animatedStyles: AnimatedValue<{
    height: ReactText,
    opacity: OpaqueInterpolation<any>,
  }>;
}

type Props = DispatchProps & OwnProps & StateProps;

const HiddenArea: React.FC<Props> = ({
  incrementWeight,
  decrementWeight,
  animatedStyles,
  changeReps,
  activity: {
    repsGoal,
    weightInKilos,
    repsAchieved,
  },
  useKilos,
}) => (
  <animated.div style={{
    height: animatedStyles.height,
    opacity: animatedStyles.opacity,
    cursor: 'default',
  }}>
    <IncrementDecrementPanel
      handleDecrement={decrementWeight}
      handleIncrement={incrementWeight}
      percentageComplete={1}
    >
      <p>
        <MainValue>{convertWeight(weightInKilos, useKilos)}</MainValue>
      </p>
      <p>{useKilos ? 'kg' : 'lbs'}</p>
    </IncrementDecrementPanel>
    <IncrementDecrementPanel
      handleDecrement={() => changeReps(-1)}
      handleIncrement={() => changeReps(1)}
      percentageComplete={repsAchieved / repsGoal}
    >
      <p>
        <MainValue>{repsAchieved}</MainValue>
        {`/${repsGoal}`}
      </p>
      <p>Reps</p>
    </IncrementDecrementPanel>
  </animated.div>
);

type ChangeSetAction = ReduxAction<SingleSetAction & any>;
type ChangeSetDispatch = Dispatch<ChangeSetAction>;

interface StateProps {
  useKilos: boolean;
}

interface DispatchProps {
  changeReps: (increment: number) => ChangeSetAction;
  incrementWeight: () => ReduxAction<SingleSetAction>;
  decrementWeight: () => ReduxAction<SingleSetAction>;
}

const mapStateToProps = (state: State): StateProps => ({
  useKilos: state.settings.useKilos,
});

const mapDispatchToProps = (
  dispatch: ChangeSetDispatch,
  ownProps: OwnProps
): DispatchProps => ({
  decrementWeight: () => dispatch({
    type: DECREMENT_WEIGHT,
    payload: {
      groupId: ownProps.groupId,
      index: ownProps.index,
    },
  }),
  incrementWeight: () => dispatch({
    type: INCREMENT_WEIGHT,
    payload: {
      groupId: ownProps.groupId,
      index: ownProps.index,
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

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(HiddenArea);
