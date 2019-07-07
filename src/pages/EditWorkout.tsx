import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Button } from '../components/AlertConfirm';
import { EditableActivityList } from '../components/ActivityList';
import EditWorkoutHero from '../components/EditWorkoutHero';
import BackLinkBanner from '../components/BackLinkBanner';
import { AnimatedSlidingPage } from './ActiveWorkout';
import {
  Exercises, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Exercise, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  tileMinHeight,
  purple,
  activityHeadingHeight,
  bannerHeight,
  ADD_SET_TO_NEW_WORKOUT,
} from '../helpers/constants';

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

interface OwnProps {
  animationStyles: any;
}

type Props = OwnProps & StateProps & DispatchProps;

const EditWorkout: React.FC<Props> = ({
  animationStyles: { position, left },
  addSet,
}) => {
  // const [ searchQuery, setSearchQuery ] = useState('');
  const [ workoutName, setWorkoutName ] = useState('');

  // const handleSearchChange = e => {
  //   e.preventDefault();
  //   setSearchQuery(e.target.value);
  // };

  const handleEditNameChange = (e: any) => {
    e.preventDefault();
    setWorkoutName(e.target.value);
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
    <AnimatedSlidingPage style={{ position, left }}>
      <BackLinkBanner back={{ link: '/workouts/' }} />
      <EditWorkoutHero
        name={workoutName}
        handleInputChange={handleEditNameChange}
      />
      <EditableActivityList />

      <Tile>
        <Button background={'grey'}>Add Group</Button>
        <Button onClick={addSet} background={purple}>Add Set</Button>
      </Tile>
      <BottomEmptySpace />
    </AnimatedSlidingPage>
  );
};

const mapDispatchToProps: DispatchProps = ({
  addSet: () => ({
    type: ADD_SET_TO_NEW_WORKOUT,
    payload: undefined,
  }),
});

interface DispatchProps {
  addSet: () => ReduxAction<undefined>
}

const mapStateToProps = (state: State) => ({
  exercises: state.entities.exercises,
});

interface StateProps {
  exercises: Exercises;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(EditWorkout);

