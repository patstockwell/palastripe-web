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
import { BackLinkBanner } from '../../components/BackLinkBanner';

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

interface SearchPieces {
  searchPieces: Array<string[] | string>
}

type SearchableExercise = Exercise & SearchPieces;

function filterList(
  allExercises: SearchableExercise[],
  firstSearchTerm: string,
) {
  return allExercises.reduce((
    accumulator: SearchableExercise[],
    exercise,
  ): SearchableExercise[] => {
    let foundMatch = false;

    const searchPieces = exercise.searchPieces.reduce((
      acc: Array<string | string[]>,
      curr,
    ) => {
      if (Array.isArray(curr)) {
        return [ ...acc, curr ];
      }

      const index = curr.toLowerCase().indexOf(firstSearchTerm.toLowerCase());

      if (index === -1) {
        return [ ...acc, curr ];
      }

      foundMatch = true;

      return [
        ...acc,
        curr.slice(0, index),
        [curr.slice(index, index + firstSearchTerm.length)],
        curr.slice(index + firstSearchTerm.length),
      ];
    }, []);

    if (foundMatch) {
      return [ ...accumulator, { ...exercise, searchPieces }]
    }

    return accumulator;
  }, []);
};

function searchExercises(
  searchTerms: string[],
  allExercises: SearchableExercise[],
): SearchableExercise[] {
  const [firstSearchTerm, ...remainingSearchTerms] = searchTerms;

  if (firstSearchTerm === undefined) {
    return allExercises;
  }

  const filteredList = filterList(allExercises, firstSearchTerm);
  return searchExercises(remainingSearchTerms, filteredList);
};

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

  const endSearchAndAddExercise = () => {
    // Add this exercise to a custom-exercise list
    addExercise({
      name: searchQuery,
      id: searchQuery.trim().split(' ').join('-').toLowerCase(),
      tags: [],
    })
    finishSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.which === 13) { // if enter key is pressed
      endSearchAndAddExercise();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  // Can I make this async so I don't block keyboard input?
  const multipleMatches = searchQuery.length < 3 ? [] :
    searchExercises(
      searchQuery.split(' '),
      exerciseList.map(e => ({ ...e, searchPieces: [e.name], })),
    );

  const addExerciseLink = searchQuery.length ? {
    showArrows: false,
    link: '',
    text: 'Add',
    handleClick: endSearchAndAddExercise,
  } : undefined;

  return (
    <ActivitySearchBackground>
      <BackLinkBanner
        sticky={false}
        back={{ handleClick: finishSearch, link: '', showArrows: true }}
        continueTo={addExerciseLink}
      />
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
          <SearchSuggestionTile
            key={exercise.id}
            onClick={() => {
              addExercise(exercise);
              finishSearch();
            }}
          >
            {exercise.searchPieces.map(piece => (
              Array.isArray(piece) ? <strong key={piece[0]}>{piece}</strong> : piece
            ))}
          </SearchSuggestionTile>
        ))}
      </Ul>
    </ActivitySearchBackground>
  );
};
