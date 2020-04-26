import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { exercises } from '../../workoutData/exercises';
import { Exercise } from '../../helpers/types';
import { gutterWidth } from '../../helpers/constants';

const Input = styled.input`
  width: calc(100% - (2 * ${gutterWidth}px));
  box-sizing: border-box;
  border: 2px solid grey;
  margin: ${gutterWidth}px;
  font-size: 18px;
  padding: 12px;
  border-radius: 4px;
`;

const SearchSuggestionTile = styled.li`
  color: blue;
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

interface WordSlices {
  start: string;
  highlight: string;
  end: string;
}

type SlicesWithId = WordSlices & { id: string };

const sliceWord = (
  word: string, index: number, length: number
): WordSlices => ({
  start: word.slice(0, index),
  highlight: word.slice(index, index + length),
  end: word.slice(index + length),
});

const accumulateMatches =
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

export const ActivitySearch = () => {
  const inputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

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
    <ActivitySearchBackground>
      <Input
        ref={inputRef}
        placeholder="Search for exercises"
        onChange={handleSearchChange}
        value={searchQuery}
        autoFocus
      />
      <ul>
        {matches}
      </ul>
    </ActivitySearchBackground>
  );
};
