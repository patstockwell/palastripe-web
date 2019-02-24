import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutTile from '../LayoutTile';
import { FlipArrows } from '../../assets/SVGs';
import { pink } from '../../helpers/constants';
import Set, { getTheme } from './Set';

const ExerciseName = styled.h3`
  font-weight: 400;
  font-size: 19px;
  padding: 0 10px;
`;

const FlipButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 19px;
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: baseline;
`;

const SetsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
`;

const SetsTile = ({ name, handleClick, sets, handleTileFlip, weight }) => {
  const hightlightedSets = sets.map(
    ({ max, completed }, index) => {
      const reps = isNaN(completed) ? max : completed;
      const theme = getTheme(completed, max);

      return (
        <Set
          key={index}
          onClick={() => handleClick(index, completed, max)}
          {...theme}
        >{reps}</Set>
      );
    }
  );

  return (
    <LayoutTile className="front">
      <HeadingWrapper>
        <ExerciseName>{name}</ExerciseName>
        <FlipButton onClick={() => handleTileFlip(true)}>
          {weight}kg&nbsp;
          <FlipArrows height={15} colour={pink}/>
        </FlipButton>
      </HeadingWrapper>
      <SetsWrapper>
        {hightlightedSets}
      </SetsWrapper>
    </LayoutTile>
  );
};

SetsTile.propTypes = {
  handleTileFlip: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  weight: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  flip: PropTypes.bool,
  sets: PropTypes.array.isRequired,
};

const areEqualProps = (prev, next) => {
  // if the tile is flipped, don't re-render (pretend props are equal)
  return next.flip;
};

const PureSetsTile = React.memo(SetsTile, areEqualProps);

export default PureSetsTile;

