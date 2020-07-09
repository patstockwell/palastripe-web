import React from 'react';
import styled from 'styled-components';
import AdditionSymbol from '../../../assets/svg/AdditionSymbol';
import SubtractionSymbol from '../../../assets/svg/SubtractionSymbol';
import { pink, purple } from '../../../helpers/constants';

const IconWrapper = styled.div`
  height: 20px;
  width: 20px;
`;

const Button = styled.button`
  padding: 14px;
  border-radius: 50%;
  border: none;
  margin: 16px;
  background-color: white;
  border: 4px solid grey;
  touch-action: manipulation; // stops double-tap-to-zoom
`;

const InnerCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  height: 96px;
  width: 96px;
  background-color: white;
`;

const OuterCircle = styled.div<{ lessThanHalf: boolean, degrees: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: relative;
  width: 108px;
  height: 108px;
  background-color: ${({ lessThanHalf }) => lessThanHalf ? pink : purple};
  background-image:
      linear-gradient(
        ${({ degrees }) => degrees}deg,
        transparent 50%,
        ${({ lessThanHalf }) => lessThanHalf ? pink : purple} 50%),
      linear-gradient(
        ${({ lessThanHalf }) => lessThanHalf ? 90 : 270}deg,
        transparent 50%,
        ${({ lessThanHalf }) => lessThanHalf ? purple : pink} 50%);
`;

const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

interface Props {
  handleDecrement: () => any;
  handleIncrement: () => any;
  percentageComplete?: number;
}

export const IncrementDecrementPanel: React.FC<Props> = ({
  children,
  handleDecrement,
  handleIncrement,
  percentageComplete: c,
}) => {
  const lessThanHalf = c < 0.5;
  const degrees = c > 1 ? 270 : (360 * (c)) - 90;

  return (
    <Panel>
      <Button
        onClick={handleDecrement}
        // This fixes a strange bug where fast clicks on the button don't work.
        // When a double click handler is added, fast clicks respond again.
        onDoubleClick={() => null}
      >
        <IconWrapper>
          <SubtractionSymbol fill={'grey'} />
        </IconWrapper>
      </Button>
      <OuterCircle
        lessThanHalf={lessThanHalf}
        degrees={lessThanHalf ? degrees - 180 : degrees}
      >
        <InnerCircle>
          {children}
        </InnerCircle>
      </OuterCircle>
      <Button onClick={handleIncrement}>
        <IconWrapper>
          <AdditionSymbol style={{
            padding: 0,
            margin: 0,
            fill: 'grey',
          }} />
        </IconWrapper>
      </Button>
    </Panel>
  );
};
