import React from 'react';
import PropTypes from 'prop-types';
import LayoutTile from '../LayoutTile';
import styled from 'styled-components';
import { FlipArrows } from '../../assets/SVGs';
import { SubtractionSymbol, AdditionSymbol } from '../../assets/SVGs';
import { pink } from '../../helpers/constants';

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

const FlipButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 19px;
`;

const RowLayoutRightAlign = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RowLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 200px;
`;

const BackTile = ({ handleTileFlip, weight, setWeight }) => (
  <LayoutTile className="back">
    <RowLayoutRightAlign>
      <FlipButton onClick={() => handleTileFlip(false)}>
        {weight}kg&nbsp;
        <FlipArrows height={15} colour={pink}/>
      </FlipButton>
    </RowLayoutRightAlign>
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

BackTile.propTypes = {
  handleTileFlip: PropTypes.func.isRequired,
  weight: PropTypes.number.isRequired,
  setWeight: PropTypes.func.isRequired,
};

const areEqualProps = (prev, next) => (
  prev.weight === next.weight
);

const PureBackTile = React.memo(BackTile, areEqualProps);

export default PureBackTile;

