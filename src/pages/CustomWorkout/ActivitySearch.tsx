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

  & strong {
    color: black;
  }
`;

const ActivitySearchBackground = styled.div`
  background: white;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
`;

interface SlicesWithId {
  start: string;
  highlight: string;
  end: string;
  id: string;
}

const accumulateMatches = (
  searchTerm: string,
  list: SlicesWithId[],
  e: Exercise,
): SlicesWithId[] => {
    const name = e ? e.name : '';
    const index = name.toLowerCase().indexOf(searchTerm.toLowerCase());

    return index === -1 ? list : [
      ...list,
      {
        id: e.id,
        start: name.slice(0, index),
        highlight: name.slice(index, index + searchTerm.length),
        end: name.slice(index + searchTerm.length),
      },
    ];
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  // Can I make this async so I don't block typing?
  const matches = searchQuery.length >= 3 && exerciseList
    .reduce((acc: SlicesWithId[], curr: Exercise): SlicesWithId[] => (
      accumulateMatches(searchQuery, acc, curr)
    ), [])
    .map(({ id, start, highlight, end }: SlicesWithId) => (
      <SearchSuggestionTile
        key={start + highlight + end}
        onClick={() => {
          addExercise(exercises.byId[id]);
          finishSearch();
        }}
      >
        {start}<strong>{highlight}</strong>{end}
      </SearchSuggestionTile>
    ));

  return (
    <ActivitySearchBackground>
      <Input
        ref={inputRef}
        placeholder="Search for an exercise"
        onChange={handleSearchChange}
        value={searchQuery}
        autoFocus
      />
      <Ul>{matches}</Ul>
    </ActivitySearchBackground>
  );
};
