import React, { Fragment } from 'react';
import styled from 'styled-components';
import { pink, purple } from '../../helpers/constants';
import { getHoursAndMinutes } from '../../helpers/functions';

const Heading = styled.h3`
  color: grey;
  font-size: 0.75em;
  text-transform: uppercase;
`;

const TotalWorkouts = styled.p`
  font-size: 5em;
`;

const Workouts = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding: 48px 0;
`;

const TimesAndWeights = styled.div`
  display: flex;
  justify-content: space-around;

  // this allows the bottom of the div to overflow the edge of its sibling
  margin-bottom: -24px;
  padding: 24px 0 48px 0;
  border-radius: 24px 24px 0 0;
  background-image: linear-gradient(140deg, ${pink}, ${purple});
  color: white;

  & h3 {
    color: lightgrey;
  }
`;

const Total = styled.p`
  font-weight: 800;
  font-size: 1.5em;
`;

const UnitLabel = styled.span`
  font-size: 0.5em;
  font-weight: 400;
`;

const Statistic = styled.div`
  flex-direction: column-reverse;
`;

interface Props {
  totalWeight: number;
  totalMinutes: number;
  totalWorkouts: number;
}

const ActivityHistoryHero: React.FC<Props> = ({
  totalMinutes, totalWorkouts, totalWeight,
}) => {
  const { mins, hours, minsLabel, hoursLabel } = getHoursAndMinutes(totalMinutes);

  return (
    <Fragment>

      <Workouts>
        <Heading>Completed Workouts</Heading>
        <TotalWorkouts>
          {totalWorkouts}
        </TotalWorkouts>
      </Workouts>

      <TimesAndWeights>
        <Statistic>
          <Heading>Total Time</Heading>
          <Total>
            {hours > 0 &&
              <span>{hours} <UnitLabel>{hoursLabel}</UnitLabel>{' '}</span>
            }
            {mins < 10 ? `0${mins}` : mins} <UnitLabel>{minsLabel}</UnitLabel>
          </Total>
        </Statistic>

        <Statistic>
          <Heading>Total Weight</Heading>
          <Total>
            <span>{totalWeight} <UnitLabel>{'kg'}</UnitLabel></span>
          </Total>
        </Statistic>
      </TimesAndWeights>

    </Fragment>
  );
};

export default ActivityHistoryHero;
