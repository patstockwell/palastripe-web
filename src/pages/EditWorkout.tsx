import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AnimatedSlidingPage } from './ActiveWorkout';
import {
  Exercises, // eslint-disable-line no-unused-vars
} from '../helpers/types';

interface OwnProps {
  animationStyles: any;
}

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

  const matches = inputValue.length >= 3 &&
    exercises.allIds.map(id => {
      const { name } = exercises.byId[id];
      if (name.toLowerCase().indexOf(inputValue) !== -1) {
        return <div key={name}>{name}</div>;
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

