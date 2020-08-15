import React, { useState, useRef, useMemo } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useActiveWorkout } from '../../reducers/activeWorkoutReducer';
import { exercises } from '../../workoutData/exercises';
import { Exercise, State, WeightedActivity } from '../../helpers/types';
import {
  appMaxWidth,
  gutterWidth,
  lightGrey1,
  charcoal,
  lightGrey3,
} from '../../helpers/constants';
import { BackLinkBanner } from '../../components/BackLinkBanner';
import { useSelectedExercise } from '../../context/useSelectedExercise';
import {onTheFlyWorkoutGroupId} from '../../workoutData/workouts/onTheFly';

export const Input = styled.input`
  color: ${charcoal};
  width: 100%;
  box-sizing: border-box;
  border: 2px solid grey;
  font-size: 18px;
  padding: 12px;
  border-radius: 4px;

  @media(max-width: ${appMaxWidth}px) {
    &:focus {
      outline: none;
    }
  }
`;

const PanelWithGutter = styled.div`
  padding: ${gutterWidth}px;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  border-left: 1px solid ${lightGrey1};
  border-right: 1px solid ${lightGrey1};

  & > li {
    border-top: 1px solid ${lightGrey1};
  }

  & > li:last-child {
    border-bottom: 1px solid ${lightGrey1};
  }
`;

const OverflowContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SearchSuggestionTile = styled.li`
  height: 48px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-style: italic;
  padding: 0 12px;
  color: ${charcoal};
  cursor: pointer;

  & strong {
    color: black;
  }

  &:hover,
  &:active {
    background: ${lightGrey3};
  }
`;

const ActivitySearchBackground = styled.div`
  background: white;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 3;
`;

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

  if (!activeWorkout) {
    return <Redirect to="/workouts/" />;
  }

  // use the first group as there is only one group in the onTheFly workout.
  const newActivityIndex = activeWorkout.exerciseGroups[0].exercises.length;
  const backLinkPath = `/workouts/${activeWorkout.id}`;

  const endSearchAndAddExercise = ({
    exerciseId,
    name,
    weightInKilos = 40,
    repsAchieved = 10,
  }: {
    name?: string,
    exerciseId?: string,
    repsAchieved?: number,
    weightInKilos?: number,
  }) => {
    addActivity({
      name: name || searchQuery,
      exerciseId: exerciseId || searchQuery.trim().split(' ').join('-').toLowerCase(),
      id: uuidv4(),
      repsAchieved,
      weightInKilos,
      autoIncrement: 0,
      completed: true,
    });
    // Set the newly added exercise as `selected`
    setSelectedExercise({
      groupId: onTheFlyWorkoutGroupId,
      index: newActivityIndex,
    });
    // navigate back to the active workout URL
    history.push(`/workouts/${activeWorkout.id}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.which === 13) { // if enter key is pressed
      endSearchAndAddExercise({});
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  // TODO: Can I make this async so I don't block keyboard input?
  const multipleMatches = searchQuery.length < 2 ? [] :
    searchExercises(
      searchQuery.split(' '),
      exerciseList.map(e => ({ ...e, searchPieces: [e.name], })),
    );

  const recentActivities: WeightedActivity[] =
    activeWorkout.exerciseGroups[0].exercises.reduce((acc, curr) => {
      const isNewExercise = acc.every(a => a.exerciseId !== curr.exerciseId);

      return isNewExercise
        // add the new exercise
        ? [ ...acc, curr ]
        // else replace the one that exists with the most recent
        : acc.map(a => a.exerciseId === curr.exerciseId ? curr : a);
    }, []);

  const continueToArgs = searchQuery.length ? {
    showArrows: false,
    link: backLinkPath,
    text: 'Add',
    handleClick: () => endSearchAndAddExercise({}),
  } : undefined;

  return (
    <ActivitySearchBackground>
      <BackLinkBanner
        sticky={false}
        back={{ link: backLinkPath, showArrows: true }}
        continueTo={continueToArgs}
      />
      <PanelWithGutter>
        <Input
          ref={inputRef}
          placeholder="Search or create new exercise"
          onChange={handleSearchChange}
          value={searchQuery}
          autoFocus
          onKeyDown={handleKeyPress}
        />
        <Ul>
          {multipleMatches.length // show suggestions from the input query
            ?  multipleMatches.map(exercise => (
              <SearchSuggestionTile
                key={exercise.id}
                onClick={() => endSearchAndAddExercise({
                  name: exercise.name,
                  exerciseId: exercise.id,
                  weightInKilos: exercise.defaultWeightInKilos,
                })}
              >
                <OverflowContainer>
                  {exercise.searchPieces.map(piece => Array.isArray(piece)
                    // Use an array with only one item in it to represent a section
                    // of the search that should be bold. This is because an array
                    // of strings can be rendered in the same way as a string.
                    ? <strong key={piece[0]}>{piece}</strong> : piece
                  )}
                </OverflowContainer>
              </SearchSuggestionTile>
            )) // else show the recently added exercises as suggestions
            : Object.values(recentActivities).map((activity: WeightedActivity) => (
              <SearchSuggestionTile
                key={activity.id}
                onClick={() => endSearchAndAddExercise({
                  name: activity.name,
                  repsAchieved: activity.repsAchieved,
                  exerciseId: activity.exerciseId,
                  weightInKilos: activity.weightInKilos,
                })}
              >
                {activity.name}
              </SearchSuggestionTile>
            ))
          }
        </Ul>
      </PanelWithGutter>
    </ActivitySearchBackground>
  );
};

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

