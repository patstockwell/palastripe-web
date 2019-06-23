import React, { useState } from 'react';
import { connect } from 'react-redux';
import SearchSuggestionTile from '../components/SearchSuggestionTile';
import EditWorkoutHero from '../components/EditWorkoutHero';
import SearchBar from '../components/SearchBar';
import EditIconPencil from '../assets/svg/EditIconPencil';
import BackLinkBanner from '../components/BackLinkBanner';
import { AnimatedSlidingPage } from './ActiveWorkout';
import {
  Exercises, // eslint-disable-line no-unused-vars
  Exercise, // eslint-disable-line no-unused-vars
} from '../helpers/types';

interface OwnProps {
  animationStyles: any;
}

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

type Props = OwnProps & StateProps;

const EditWorkout: React.FC<Props> = ({
  animationStyles: { position, left },
  exercises,
}) => {
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ workoutName, setWorkoutName ] = useState('Your workout name');

  const handleSearchChange = e => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleEditNameChange = e => {
    e.preventDefault();
    setWorkoutName(e.target.value);
  };

  // Can I match more than one word?
  // A search for `cur bicep` should match `Bicep Curl`
  const matches: JSX.Element[] = searchQuery.length >= 3 &&
    exercises.allIds
      .map((id: string): Exercise => exercises.byId[id])
      .reduce((acc: SlicesWithId[], curr: Exercise): SlicesWithId[] => (
        accumulateMatches(searchQuery, acc, curr)
      ), [])
      .map(({ id, start, highlight, end }: SlicesWithId) => (
        <SearchSuggestionTile id={id} key={start + highlight + end}>
          {start}<strong>{highlight}</strong>{end}
        </SearchSuggestionTile>
      ));

  return (
    <AnimatedSlidingPage style={{ position, left }}>
      <BackLinkBanner linkTo={'/workouts/'} />
      <EditWorkoutHero
        name={workoutName}
        handleInputChange={handleEditNameChange}
      />
      <p>
        <EditIconPencil width={16} height={16} />
        the edit workout screen
      </p>
      <SearchBar inputValue={searchQuery} changeHandler={handleSearchChange} />
      {matches}
    </AnimatedSlidingPage>
  );
};

const mapStateToProps = state => ({
  exercises: state.entities.exercises,
});

interface StateProps {
  exercises: Exercises;
}

export default connect<StateProps, void, void>(
  mapStateToProps,
  null
)(EditWorkout);

