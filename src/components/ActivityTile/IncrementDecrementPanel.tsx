import React from 'react';
import styled from 'styled-components';
import AdditionSymbol from '../../assets/svg/AdditionSymbol';
import SubtractionSymbol from '../../assets/svg/SubtractionSymbol';
import { pink, purple } from '../../helpers/constants';
import {
  SingleSetAction, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../../helpers/types';

const Button = styled.button`
  border-radius: 50%;
  border: none;
  height: 48px;
  width: 48px
  margin: 16px;
  background-color: ${purple};
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

const OuterCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: relative;
  width: 108px;
  height: 108px;
  background-color: ${purple};
  background-image:
      linear-gradient(-100deg, transparent 50%, ${purple} 50%),
      linear-gradient(90deg, ${pink} 50%, transparent 50%);
`;

const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
`;

type DispatchFunction = () => ReduxAction<SingleSetAction & { value: number }>;

interface Props {
  handleDecrement: DispatchFunction;
  handleIncrement: DispatchFunction;
}

const IncrementDecrementPanel: React.FC<Props> = ({
  children,
  handleDecrement,
  handleIncrement,
}) => (
  <Panel>
    <Button onClick={handleDecrement}>
      <SubtractionSymbol fill={'white'} />
    </Button>
    <OuterCircle>
      <InnerCircle>
        {children}
      </InnerCircle>
    </OuterCircle>
    <Button onClick={handleIncrement}>
      <AdditionSymbol fill={'white'} />
    </Button>
  </Panel>
);

export default IncrementDecrementPanel;
