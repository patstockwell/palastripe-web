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
  font-size: 0.75em;
  text-transform: uppercase;
`;

const TotalWorkouts = styled.p`
  font-size: 5em;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;

const TotalMinutes = styled.p`
  font-weight: 800;
  font-size: 1.5em;
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
