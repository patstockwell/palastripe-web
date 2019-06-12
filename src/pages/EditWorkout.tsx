import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AnimatedSlidingPage } from './ActiveWorkout';
import {
  Exercises, // eslint-disable-line no-unused-vars
} from '../helpers/types';

interface OwnProps {
  animationStyles: any;
}

export const sliceWord = (word: string, index: number, length: number): {
  start: string, highlight: string, end: string,
} => ({
  start: word.slice(0, index),
  highlight: word.slice(index, index + length),
  end: word.slice(index + length),
});

type Props = OwnProps & StateProps;

const EditWorkout: React.FC<Props> = ({
  animationStyles: { position, left },
  exercises,
}) => {
  const [ inputValue, setInputValue ] = useState('');

  const handleInputChange = e => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const matches: JSX.Element[] = inputValue.length >= 3 &&
    exercises.allIds.map((id: string) => {
      const exercise = exercises.byId[id];
      const name = exercise ? exercise.name : '';
      const matchingIndex = name
        .toLowerCase()
        .indexOf(inputValue.toLowerCase());

      if (matchingIndex !== -1) { // if we find a match
        const { start, highlight, end, } =
          sliceWord(name, matchingIndex, inputValue.length);

        return (
          <div key={name}>
            {start}<strong>{highlight}</strong>{end}
          </div>
        );
      }
    });

  return (
    <AnimatedSlidingPage style={{ position, left }}>
      the edit workout screen
      <input type="text" value={inputValue} onChange={handleInputChange} />
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

