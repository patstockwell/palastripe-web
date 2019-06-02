import React from 'react';
import styled from 'styled-components';
import AdditionSymbol from '../../assets/svg/AdditionSymbol';
import SubtractionSymbol from '../../assets/svg/SubtractionSymbol';
import { pink, purple } from '../../helpers/constants';

const Button = styled.button`
  border-radius: 50%;
  border: none;
  height: 48px;
  width: 48px
  margin: 16px;
  background-color: ${purple};
  // background-image: linear-gradient(140deg, ${pink}, ${purple});
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

const MainValue = styled.span`
  font-size: 32px;
  font-weight: 800;
`;

const Reps = styled.p`
`;

interface Props {
  isRepetitions?: boolean;
  number: number;
  label: string;
}

const IncrementDecrementPanel: React.FC<Props> = ({
  number,
  label,
  isRepetitions,
}) => (
  <Panel>
    <Button>
      <SubtractionSymbol fill={'white'} />
    </Button>
    <OuterCircle>
      <InnerCircle>
        <Reps>
          <MainValue>{number}</MainValue>
          {isRepetitions && '/12'}
        </Reps>
        <p>{label}</p>
      </InnerCircle>
    </OuterCircle>
    <Button>
      <AdditionSymbol fill={'white'} />
    </Button>
  </Panel>
);

export default IncrementDecrementPanel;
