import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  purple,
  ADD_EXERCISE_TO_NEW_WORKOUT,
} from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const Tile = styled.button`
  background-color: ${purple};
  border: ${purple} 2px solid;
  border-radius: 5px;
  display: block;
  margin: 8px;
  padding: 12px;
  font-size: 16px;
  color: lightgrey;
  font-weight: 600;

  & strong {
    color: white;
  }
`;

interface OwnProps {
  id: string;
}

type Props = OwnProps & DispatchProps;

const SearchSuggestionTile: React.FC<Props> = ({
  id,
  children,
  addExerciseToEditWorkout,
}) => (
  <Tile id={id} onClick={addExerciseToEditWorkout}>
    {children}
  </Tile>
);

interface DispatchProps {
  addExerciseToEditWorkout: (id: string) => ReduxAction<string>;
}

const mapDispatchToProps = (dispatch, { id }: OwnProps) => ({
  addExerciseToEditWorkout: () => dispatch({
    type: ADD_EXERCISE_TO_NEW_WORKOUT,
    payload: id,
  }),
});

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(SearchSuggestionTile);
