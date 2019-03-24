import React from 'react';
import LayoutTile from '../LayoutTile';
import styled from 'styled-components';
import FlipArrows from '../../assets/svg/FlipArrows';
import AdditionSymbol from '../../assets/svg/AdditionSymbol';
import TrashCan from '../../assets/svg/TrashCan';
import SubtractionSymbol from '../../assets/svg/SubtractionSymbol';
import { pink } from '../../helpers/constants';
import { HeadingWrapper, TileName, Weight } from './SetsTile';

const SvgButtonWrapper = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  // stops double-tap-to-zoom
  touch-action: manipulation;
  width: 50px;
  height: 50px;
  padding: 0;
  background-color: ${({ background }) => background};
  margin-right: ${({ margin }) => margin}px;
  transform: rotate(${({ degrees }) => degrees}deg);

  & > svg {
    width: 30px;
    height: 30px;
  }

  &:active {
    background-color: ${pink};
  }
`;

const RowLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  width: 280px;
`;

const Tile = styled(LayoutTile)`
  height: 100%;
`;

const WeightIncrementTile = ({
  name,
  handleTileFlip,
  setShowAlertRemove,
  weight,
  setWeight,
}) => (
  <Tile>
    <HeadingWrapper onClick={() => handleTileFlip(false)}>
      <TileName>{name}</TileName>
      <Weight>
        {weight}kg&nbsp;
        <FlipArrows height={15} colour={pink}/>
      </Weight>
    </HeadingWrapper>
    <RowLayout>
      <SvgButtonWrapper
        onClick={() => setShowAlertRemove()}
        background={'#555'}
      >
        <TrashCan fill={'white'}/>
      </SvgButtonWrapper>
      <SvgButtonWrapper
        onClick={() => setWeight(weight - 2.5)}
        background={'lightgrey'}
      >
        <SubtractionSymbol />
      </SvgButtonWrapper>
      <SvgButtonWrapper
        onClick={() => setWeight(weight + 2.5)}
        background={'lightgrey'}
      >
        <AdditionSymbol />
      </SvgButtonWrapper>
    </RowLayout>
  </Tile>
);

const areEqualProps = (prev, next) => (
  prev.weight === next.weight
);

const PureWeightIncrementTile = React.memo(WeightIncrementTile, areEqualProps);

export default PureWeightIncrementTile;

