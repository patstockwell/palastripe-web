import React, { Fragment } from 'react';
import styled from 'styled-components';

import {green, purple} from '../../helpers/constants';
import {getHoursAndMinutes} from '../../helpers/functions';
import {CalendarGraph} from './CalendarGraph';

const headingStyle = `
  color: grey;
  font-size: 0.75em;
  text-transform: uppercase;
  margin: 0;
`;

const Heading = styled.h2`
  ${headingStyle}
`;

const TotalWorkouts = styled.p`
  font-size: 5em;
  margin: 0;
`;

const Workouts = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding: 32px 0;
`;

const HighlightPanel = styled.div`
  // this allows the bottom of the div to overflow the edge of its sibling
  margin-bottom: -24px;
  padding: 24px 0 48px 0;
  border-radius: 24px 24px 0 0;
  background-image: linear-gradient(140deg, ${green}, ${purple});
  color: white;
`;

const HighlightPanelHeading = styled.h2`
  ${headingStyle}
  text-align: center;
  color: lightgrey;
  transform: translateY(-8px);

`;

const StatsHeading = styled.h3`
  ${headingStyle}
  color: lightgrey;
`;

const TimesAndWeights = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Total = styled.p`
  font-weight: 800;
  font-size: 1.5em;
  margin: 0;
`;

const UnitLabel = styled.span`
  font-size: 0.5em;
  font-weight: 400;
`;

const Statistic = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

interface Props {
  weeklyVolume: number;
  weeklyMinutes: number;
  totalWorkouts: number;
  unitOfWeight: string;
  workoutsThisWeek: number;
}

export const ActivityHistoryHero: React.FC<Props> = ({
  weeklyMinutes,
  totalWorkouts,
  weeklyVolume,
  unitOfWeight,
  workoutsThisWeek,
}) => {
  const { mins, hours, minsLabel, hoursLabel } = getHoursAndMinutes(weeklyMinutes);

  return (
    <Fragment>

      <Workouts>
        <Heading>Completed Workouts</Heading>
        <TotalWorkouts>
          {totalWorkouts}
        </TotalWorkouts>
      </Workouts>

      <CalendarGraph />

      <HighlightPanel>
        <HighlightPanelHeading>
          Workouts This Week: {workoutsThisWeek}
        </HighlightPanelHeading>
        <TimesAndWeights>
          <Statistic>
            <StatsHeading>Duration</StatsHeading>
            <Total>
              {hours > 0 &&
                <span>{hours} <UnitLabel>{hoursLabel}</UnitLabel>{' '}</span>
              }
              {mins < 10 ? `0${mins}` : mins} <UnitLabel>{minsLabel}</UnitLabel>
            </Total>
          </Statistic>

          <Statistic>
            <StatsHeading>Volume</StatsHeading>
            <Total>
              <span>{weeklyVolume} <UnitLabel>{unitOfWeight}</UnitLabel></span>
            </Total>
          </Statistic>
        </TimesAndWeights>
      </HighlightPanel>

    </Fragment>
  );
};
