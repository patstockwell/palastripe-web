import React, { useState, useRef, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useActiveWorkout } from '../../reducers/activeWorkoutReducer';
import { exercises } from '../../workoutData/exercises';
import { Exercise, State } from '../../helpers/types';
import {
  appMaxWidth,
  gutterWidth,
  lightLightGrey,
  charcoal,
  superLightGrey,
} from '../../helpers/constants';
import { BackLinkBanner } from '../../components/BackLinkBanner';
import { useSelectedExercise } from '../../context/useSelectedExercise';
import { customWorkoutGroupId } from '../../workoutData/workouts/customWorkout';

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
      return [ ...accumulator, { ...exercise, searchPieces }];
    }

    return accumulator;
  }, []);
}

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
}

export const activitySearchPath = 'activity-search';

export const ActivitySearch: React.FC = () => {
  const inputRef = useRef(null);
  const history = useHistory();
  const { activeWorkout } = useSelector((state: State) => state);
  const { addActivity } = useActiveWorkout();
  const [searchQuery, setSearchQuery] = useState('');
  const { setSelectedExercise } = useSelectedExercise();
  const exerciseList = useMemo(() => (
    exercises.allIds.map((id: string): Exercise => exercises.byId[id])
  ), [exercises]);
  // use the first group as that is the only group used for a custom workout.
  const newActivityIndex = activeWorkout.exerciseGroups[0].exercises.length;
  const backLinkPath = `/workouts/${activeWorkout.id}`;

  const endSearchAndAddExercise = (e?: Exercise) => {
    // Add this exercise to a custom-exercise list
    addActivity({
      name: e ? e.name : searchQuery,
      id: e ? e.id : searchQuery.trim().split(' ').join('-').toLowerCase(),
      instanceId: uuidv4(),
      repsAchieved: 10,
      weightInKilos: 40,
      autoIncrement: 0,
      completed: true,
    });
    // Set the newly added exercise as `selected`
    setSelectedExercise({
      groupId: customWorkoutGroupId,
      index: newActivityIndex,
    });
    // navigate back to the active workout URL
    history.push(`/workouts/${activeWorkout.id}`);
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
  const multipleMatches = searchQuery.length < 2 ? [] :
    searchExercises(
      searchQuery.split(' '),
      exerciseList.map(e => ({ ...e, searchPieces: [e.name], })),
    );

  const continueToArgs = searchQuery.length ? {
    showArrows: false,
    link: backLinkPath,
    text: 'Add',
    handleClick: () => endSearchAndAddExercise(),
  } : undefined;

  return (
    <ActivitySearchBackground>
      <BackLinkBanner
        sticky={false}
        back={{ link: backLinkPath, showArrows: true }}
        continueTo={continueToArgs}
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
            onClick={() => endSearchAndAddExercise(exercise)}
          >
            {exercise.searchPieces.map(piece => Array.isArray(piece)
              ? <strong key={piece[0]}>{piece}</strong> : piece
            )}
          </SearchSuggestionTile>
        ))}
      </Ul>
    </ActivitySearchBackground>
  );
};
