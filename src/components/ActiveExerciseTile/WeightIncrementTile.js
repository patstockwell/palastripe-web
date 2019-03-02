import React from 'react';
import PropTypes from 'prop-types';
import LayoutTile from '../LayoutTile';
import styled from 'styled-components';
import FlipArrows from '../../assets/svg/FlipArrows';
import AdditionSymbol from '../../assets/svg/AdditionSymbol';
import SubtractionSymbol from '../../assets/svg/SubtractionSymbol';
import { pink } from '../../helpers/constants';
import { HeadingWrapper, TileName, Weight } from './SetsTile';

const SvgButtonWrapper = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  // stops double-tap-to-zoom
  touch-action: manipulation;
  width: 65px;
  height: 65px;
  padding: 0;

  & > svg {
    width: 50px;
    height: 50px;
  }

  &:active {
    background-color: ${pink};
    fill: white;
  }
`;

const RowLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 200px;
`;

const WeightIncrementTile = ({ name, handleTileFlip, weight, setWeight }) => (
  <LayoutTile>
    <HeadingWrapper onClick={() => handleTileFlip(false)}>
      <TileName>{name}</TileName>
      <Weight>
        {weight}kg&nbsp;
        <FlipArrows height={15} colour={pink}/>
      </Weight>
    </HeadingWrapper>
    <RowLayout>
      <SvgButtonWrapper onClick={() => setWeight(weight - 2.5)}>
        <SubtractionSymbol />
      </SvgButtonWrapper>
      <SvgButtonWrapper onClick={() => setWeight(weight + 2.5)}>
        <AdditionSymbol />
      </SvgButtonWrapper>
    </RowLayout>
  </LayoutTile>
);

WeightIncrementTile.propTypes = {
  handleTileFlip: PropTypes.func.isRequired,
  weight: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  setWeight: PropTypes.func.isRequired,
};

const areEqualProps = (prev, next) => (
  prev.weight === next.weight
);

const PureWeightIncrementTile = React.memo(WeightIncrementTile, areEqualProps);

export default PureWeightIncrementTile;

