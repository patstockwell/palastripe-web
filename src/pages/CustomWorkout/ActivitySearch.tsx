import React, { useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { useAddExercise } from '../../reducers/activeWorkoutReducer';
import { exercises } from '../../workoutData/exercises';
import { Exercise } from '../../helpers/types';
import {
  appMaxWidth,
  gutterWidth,
  lightLightGrey,
  charcoal,
  superLightGrey,
} from '../../helpers/constants';

const Input = styled.input`
  color: ${charcoal};
  width: calc(100% - (2 * ${gutterWidth}px));
  box-sizing: border-box;
  border: 2px solid grey;
  margin: ${gutterWidth}px;
  margin-bottom: 0;
  font-size: 18px;
  padding: 12px;
  border-radius: 4px;

  @media(max-width: ${appMaxWidth}px) {
    &:focus {
      outline: none;
    }
  }
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0 12px;
  list-style: none;
  border-left: 1px solid ${lightLightGrey};
  border-right: 1px solid ${lightLightGrey};

  & > li {
    border-top: 1px solid ${lightLightGrey};
  }

  & > li:last-child {
    border-bottom: 1px solid ${lightLightGrey};
  }
`;

const SearchSuggestionTile = styled.li`
  font-style: italic;
  padding: 12px;
  color: ${charcoal};
  cursor: pointer;

  & strong {
    color: black;
  }

  &:hover,
  &:active {
    background: ${superLightGrey};
  }
`;

const ActivitySearchBackground = styled.div`
  background: white;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  z-index: 3;
`;

// interface SlicesWithId {
//   start: string;
//   highlight: string;
//   end: string;
//   id: string;
// }

// const accumulateMatches = (
//   searchTerm: string,
//   list: SlicesWithId[],
//   e: Exercise,
// ): SlicesWithId[] => {
//     const name = e ? e.name : '';
//     const index = name.toLowerCase().indexOf(searchTerm.toLowerCase());

//     return index === -1 ? list : [
//       ...list,
//       {
//         id: e.id,
//         start: name.slice(0, index),
//         highlight: name.slice(index, index + searchTerm.length),
//         end: name.slice(index + searchTerm.length),
//       },
//     ];
//   };

interface Props {
  finishSearch: () => void;
}

export const ActivitySearch: React.FC<Props> = ({ finishSearch }) => {
  const inputRef = useRef(null)
  const addExercise = useAddExercise();
  const [searchQuery, setSearchQuery] = useState('');
  const exerciseList = useMemo(() =>
    exercises.allIds.map((id: string): Exercise => exercises.byId[id]),
    [exercises],
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.which === 13) { // if enter key is pressed
      // Add this exercise to a custom-exercise list
      addExercise({
        name: searchQuery,
        id: searchQuery.trim().split(' ').join('-').toLowerCase(),
        tags: [],
      })
      finishSearch();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  // const matchesWithHighlighting = searchQuery.length >= 3 && exerciseList
  //   .reduce((acc: SlicesWithId[], curr: Exercise): SlicesWithId[] => (
  //     accumulateMatches(searchQuery, acc, curr)
  //   ), [])
  //   .map(({ id, start, highlight, end }: SlicesWithId) => (
  //     <SearchSuggestionTile
  //       key={start + highlight + end}
  //       onClick={() => {
  //         addExercise(exercises.byId[id]);
  //         finishSearch();
  //       }}
  //     >
  //       {start}<strong>{highlight}</strong>{end}
  //     </SearchSuggestionTile>
  //   ));

  const searchExercises = (
    searchTerms: string[],
    allExercises: Exercise[],
  ): Exercise[] => {
    const [firstSearchTerm, ...remainingSearchTerms] = searchTerms;

    if (firstSearchTerm === undefined) {
      return allExercises;
    }

    const filteredList = allExercises.filter((exercise) => {
      const index = exercise.name
        .toLowerCase()
        .indexOf(firstSearchTerm.toLowerCase());
      return index !== -1;
    });

    return searchExercises(remainingSearchTerms, filteredList);
  };

  // Can I make this async so I don't block keyboard input?
  const multipleMatches = searchQuery.length >= 3
    ? searchExercises(searchQuery.split(' '), exerciseList)
    : [];

  return (
    <ActivitySearchBackground>
      <Input
        ref={inputRef}
        placeholder="Search or create new exercise"
        onChange={handleSearchChange}
        value={searchQuery}
        autoFocus
        onKeyDown={handleKeyPress}
      />
      <Ul>
        {multipleMatches.map(exercise => (
          <SearchSuggestionTile>{exercise.name}</SearchSuggestionTile>
        ))}
      </Ul>
    </ActivitySearchBackground>
  );
};
