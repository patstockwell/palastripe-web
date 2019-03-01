import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutTile from '../LayoutTile';
import { FlipArrows } from '../../assets/SVGs';
import { pink } from '../../helpers/constants';
import Set, { getTheme } from './Set';

export const TileName = styled.h3`
  font-weight: 400;
  font-size: 17px;
  margin: 8px;
  padding: 4px 0px;
`;

export const Weight = styled.div`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  font-size: 17px;
  padding: 0;
  margin: 8px;
`;

export const HeadingWrapper = styled.div`
  -webkit-tap-highlight-color: transparent;
  outline-style: none;
  display: flex;
  justify-content: space-between;
  align-content: baseline;
  cursor: pointer;
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
    <LayoutTile>
      <HeadingWrapper onClick={() => handleTileFlip(true)}>
        <TileName>{name}</TileName>
        <Weight>
          {weight}kg&nbsp;
          <FlipArrows height={15} colour={pink}/>
        </Weight>
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

