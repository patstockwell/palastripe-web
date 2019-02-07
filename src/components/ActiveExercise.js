import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BlockPanel from './BlockPanel';
import { DECREMENT_REPS } from '../reducers/actions';
import { preventZoom } from '../helpers/functions';

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: baseline;
  padding: 0 10px;
`;

const SetsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

const Set = styled.button`
  color: ${({ text }) => text};
  background-color: ${({ background }) => background};
  border: 3px solid ${({ border }) => border};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 5px;
  font-size: 20px;
`;

export const getTheme = (completedReps, max) => {
  if (completedReps === undefined) {
    return { border: 'grey', background: 'white', text: 'grey' };
  } else if (completedReps <= 0) {
    return { border: 'grey', background: 'lightgrey', text: 'grey' };
  } else if (completedReps >= max) {
    return { border: 'green', background: 'lightgreen', text: 'black' };
  } else {
    return { border: 'blue', background: 'lightskyblue', text: 'black' };
  }
};


const ActiveExercise = ({ decrementReps, exerciseIndex, exercise }) => {
  const { sets, name, weightInKilos, completedSets = [] } = exercise;

  const handleClick = setIndex => decrementReps({ setIndex, exerciseIndex });

  const zippedSets = sets.map((reps, index) => [reps, completedSets[index]]);

  const hightlightedSets = zippedSets.map(
    ([ maxReps, completedReps ], index) => {
      const reps = isNaN(completedReps) ? maxReps : completedReps;
      const theme = getTheme(completedReps, maxReps);

      return (
        <Set
          key={index}
          onTouchStart={e => preventZoom(e)}
          onClick={() => handleClick(index)}
          {...theme}
        >{reps}</Set>
      );
    }
  );

  return (
    <BlockPanel>
      <HeadingWrapper>
        <h3>{name}</h3>
        <p>{weightInKilos}kg</p>
      </HeadingWrapper>
      <SetsWrapper>
        {hightlightedSets}
      </SetsWrapper>
    </BlockPanel>
  );
};

ActiveExercise.propTypes = {
  decrementReps: PropTypes.func,
  exerciseIndex: PropTypes.number,
  exercise: PropTypes.shape({
    name: PropTypes.string,
    weightInKilos: PropTypes.number,
    sets: PropTypes.arrayOf(PropTypes.number),
  }),
};

const mapStateToProps = (state, ownProps) => ({
  exercise: state.activeWorkout.exercises[ownProps.exerciseIndex],
});

const mapDispatchToProps = {
  decrementReps: ({ setIndex, exerciseIndex }) => ({
    type: DECREMENT_REPS,
    payload: { setIndex, exerciseIndex },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveExercise);
