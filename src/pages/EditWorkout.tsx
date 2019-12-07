import React, {
  useState,
} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { buttonStyle } from '../components/SharedStyles';
import { EditableActivityList } from '../components/ActivityList';
import EditWorkoutHero from '../components/EditWorkoutHero';
import BackLinkBanner from '../components/BackLinkBanner';
import {
  Exercises, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Exercise, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  tileMinHeight,
  activityHeadingHeight,
  bannerHeight,
  EDIT_WORKOUT_ADD_SET,
  EDIT_WORKOUT_ADD_GROUP,
} from '../helpers/constants';

const AddItemButton = styled.button<{ background?: string }>`
  ${buttonStyle}
  min-width: 130px;
`;

const BottomEmptySpace = styled.div`
  height: calc(100vh -
    ${activityHeadingHeight + bannerHeight + (2 * tileMinHeight)}px);
`;

const Tile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: ${tileMinHeight}px;
`;

interface WordSlices {
  start: string;
  highlight: string;
  end: string;
}

type SlicesWithId = WordSlices & { id: string };

export const sliceWord = (
  word: string, index: number, length: number
): WordSlices => ({
  start: word.slice(0, index),
  highlight: word.slice(index, index + length),
  end: word.slice(index + length),
});

export const accumulateMatches =
  (searchTerm: string, list: SlicesWithId[], e: Exercise): SlicesWithId[] => {
    const name = e ? e.name : '';
    const matchingIndex = name
      .toLowerCase()
      .indexOf(searchTerm.toLowerCase());

    return matchingIndex === -1 ? list : [
      ...list,
      { id: e.id, ...sliceWord(name, matchingIndex, searchTerm.length) },
    ];
  };

type Props = StateProps & DispatchProps;

const EditWorkout: React.FC<Props> = ({
  addSet,
  addGroup,
}) => {
  // const [ searchQuery, setSearchQuery ] = useState('');
  const [ workoutName, setWorkoutName ] = useState('');

  // const handleSearchChange = e => {
  //   e.preventDefault();
  //   setSearchQuery(e.target.value);
  // };

  const handleEditNameChange = (e: React.ChangeEvent) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    setWorkoutName(target.value);
  };

  // Can I match more than one word?
  // A search for `cur bicep` should match `Bicep Curl`
  // const matches: JSX.Element[] = searchQuery.length >= 3 &&
  //   exercises.allIds
  //     .map((id: string): Exercise => exercises.byId[id])
  //     .reduce((acc: SlicesWithId[], curr: Exercise): SlicesWithId[] => (
  //       accumulateMatches(searchQuery, acc, curr)
  //     ), [])
  //     .map(({ id, start, highlight, end }: SlicesWithId) => (
  //       <SearchSuggestionTile id={id} key={start + highlight + end}>
  //         {start}<strong>{highlight}</strong>{end}
  //       </SearchSuggestionTile>
  //     ));

  return (
    <React.Fragment>
      <BackLinkBanner back={{ showArrows: true, link: '/workouts/' }} />
      <EditWorkoutHero
        name={workoutName}
        handleInputChange={handleEditNameChange}
      />
      <EditableActivityList />

      <Tile>
        <AddItemButton onClick={addGroup} background={'grey'}>Add Group</AddItemButton>
        <AddItemButton onClick={addSet}>Add Set</AddItemButton>
      </Tile>
      <BottomEmptySpace />
    </React.Fragment>
  );
};

const mapDispatchToProps: DispatchProps = ({
  addSet: () => ({
    type: EDIT_WORKOUT_ADD_SET,
    payload: undefined,
  }),
  addGroup: () => ({
    type: EDIT_WORKOUT_ADD_GROUP,
    payload: undefined,
  }),
});

interface DispatchProps {
  addSet: () => ReduxAction<undefined>;
  addGroup: () => ReduxAction<undefined>;
}

const mapStateToProps = (state: State) => ({
  exercises: state.entities.exercises,
});

interface StateProps {
  exercises: Exercises;
}

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(EditWorkout);
