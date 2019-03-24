import React from 'react';
import styled, { keyframes } from 'styled-components';
import LayoutTile from '../LayoutTile';
import FlipArrows from '../../assets/svg/FlipArrows';
import Badge from '../../assets/svg/Badge';
import { pink, green } from '../../helpers/constants';
import { checkAllSetsAreComplete } from '../../helpers/functions';
import Set, { getTheme } from './Set';

const scale = keyframes`
  0% { transform: scale(0); }
  90% { transform: scale(0); }
  100% { transform: scale(1); }
`;

export const TileName = styled.h3`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 17px;
  margin: 8px;
  padding: 4px 0px;

  & > svg {
    fill: ${green};
    margin-left: 8px;
    animation: ${scale} linear 1s;
  }
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

  const allSetsCompleted = checkAllSetsAreComplete(sets);

  return (
    <LayoutTile>
      <HeadingWrapper onClick={() => handleTileFlip(true)}>
        <TileName>
          {name}
          {allSetsCompleted &&
            <Badge style={{
              height: '15px',
              width: '15px',
            }}/>
          }
        </TileName>
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

const areEqualProps = (prev, next) => {
  // if the tile is flipped, don't re-render (pretend props are equal)
  return next.flip;
};

const PureSetsTile = React.memo(SetsTile, areEqualProps);

export default PureSetsTile;

