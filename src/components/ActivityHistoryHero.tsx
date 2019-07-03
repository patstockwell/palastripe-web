import React from 'react';
import styled from 'styled-components';

const Window = styled.div`
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Heading = styled.h3`
  color: grey;
  font-size: 12px;
  text-transform: uppercase;
`;

const TotalWorkouts = styled.p`
  font-size: 76px;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;

const TotalMinutes = styled.h3`
  font-size: 24px;
`;

interface Props {
  totalMinutes: string;
  totalWorkouts: number;
}

const ActivityHistoryHero: React.FC<Props> = ({ totalMinutes, totalWorkouts }) => (
  <Window>
    <FlexWrapper>
      <Heading>Completed Workouts</Heading>
      <TotalWorkouts>
        {totalWorkouts}
      </TotalWorkouts>
    </FlexWrapper>
    <FlexWrapper>
      <Heading>Total Time</Heading>
      <TotalMinutes>
        {totalMinutes}
      </TotalMinutes>
    </FlexWrapper>
  </Window>
);

export default ActivityHistoryHero;
