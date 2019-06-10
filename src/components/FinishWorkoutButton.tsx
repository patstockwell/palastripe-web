import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ButtonStyle } from './SharedStyles';
import { FINISH_WORKOUT, tileMinHeight } from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const FinishButton = styled.button`
  ${ButtonStyle}
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${tileMinHeight}px;
`;

interface OwnProps {
  workout: Workout;
}

type Props = OwnProps & DispatchProps;

const FinishWorkoutButton: React.FC<Props> = ({
  finishWorkout,
  workout,
}) => (
  <FlexWrapper>
    <FinishButton onClick={() => finishWorkout(workout)}>
      Finish Workout
    </FinishButton>
  </FlexWrapper>
);

interface DispatchProps {
  finishWorkout: (w: Workout) => ReduxAction<{}>;
}

const mapDispatchToProps = {
  finishWorkout: (workout: Workout) => ({
    type: FINISH_WORKOUT,
    payload: workout,
  }),
};

export default connect<void, DispatchProps, void>(
  null,
  mapDispatchToProps
)(FinishWorkoutButton);
