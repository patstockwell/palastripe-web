import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import Dots from '../../assets/svg/Dots';
import Avatar from '../../components/Avatar';
import {Workout} from '../../reducers/workoutsReducer';
import { ReduxAction } from '../../helpers/types';
import {
  getDiffInMinutes,
  getHoursAndMinutes,
  getTimeSince,
  getTotalWeightLifted,
  formatWeight,
} from '../../helpers/functions';
import {DAYS_OF_THE_WEEK, purple, lightGrey3} from '../../helpers/constants';
import {useScrollPosition} from '../../context/useScrollPosition';
import {ActivityFeedOptionsMenu} from './ActivityFeedOptionsMenu';

const Tile = styled.li`
  position: relative;
  padding: 24px 0;
  border-bottom: 0.5px solid ${lightGrey3};
  display: flex;
  box-sizing: border-box;
  min-height: 180px;
`;

const TimeStamp = styled.p`
  color: grey;
  font-size: 12px;
  margin: 0;
`;

const Left = styled.div`
  position: relative;
  margin-right: 16px;
`;

const Right = styled.div`
  // self
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // children
  flex-grow: 1;
`;

const WorkoutImage = styled.div<{ image: string }>`
  width: 48px;
  height: 100%;
  border-radius: 8px 8px 8px 8px;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  opacity: 0.3;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: -8px;
`;

const SummaryLink = styled(Link)`
  font-weight: 500;
  text-decoration: none;
  color: inherit;

  & span {
    font-weight: initial;
  }

  ::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 50px;
    left: 0;
  }
`;

const StatsPanel = styled.div`
  display: flex;
`;

const StatsBox = styled.div`
  flex-basis: 50%;
`;

const UnitLabel = styled.span`
  font-size: 0.5em;
  font-weight: 400;
`;

const Statistic = styled.p`
  font-weight: 600;
  font-size: 1.5em;
  margin: 0;
`;

const TextLabel = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  color: grey;
  margin: 0;
`;

const OptionsButton = styled.button`
  border: none;
  background: none;
  display: flex;
  padding: 15px;
  float: right;
  margin: -15px 0 0 0;
`;

interface Props {
  workout: Workout;
  showMenu: boolean;
  deleteWorkout: () => ReduxAction<number>;
  toggleMenu: () => void;
  initials: string;
  useKilos: boolean;
  historyLink: number;
}

export const ActivityFeedTile: React.FC<Props> = ({
  workout,
  toggleMenu,
  showMenu,
  deleteWorkout,
  useKilos,
  historyLink,
}) => {
  const {setActivityPageScrollPosition} = useScrollPosition();

  const {name: workoutName, startTime, finishTime} = workout;
  const timeSince = getTimeSince(finishTime);
  const day = DAYS_OF_THE_WEEK[new Date(finishTime).getDay()];
  const {
    mins, hours, minsLabel, hoursLabel,
  } = getHoursAndMinutes(getDiffInMinutes(startTime, finishTime));
  const totalWeightLifted = getTotalWeightLifted(workout);

  const {label, weight} = formatWeight(totalWeightLifted, useKilos);

  return (
    <Tile>
      <Left>
        <WorkoutImage image={workout.imageUrl} />
        <AvatarWrapper>
          <Avatar backgroundColour={purple} />
        </AvatarWrapper>
      </Left>
      <Right>
        <div>
          <OptionsButton onClick={toggleMenu}>
            <Dots />
          </OptionsButton>
          <TimeStamp>{day}, {timeSince}</TimeStamp>
          <SummaryLink
            onClick={() => setActivityPageScrollPosition(window.scrollY)}
            to={`/activity/${historyLink}`}
          >
            <div>You <span>completed</span></div>
            <div>{workoutName}</div>
          </SummaryLink>
        </div>
        <StatsPanel>
          <StatsBox>
            <Statistic>
              {hours > 0 &&
                <span>{hours} <UnitLabel>{hoursLabel}</UnitLabel>{' '}</span>
              }
              {mins} <UnitLabel>{minsLabel}</UnitLabel>
            </Statistic>
            <TextLabel>Duration</TextLabel>
          </StatsBox>
          <StatsBox>
            <Statistic>{weight}<UnitLabel>{label}</UnitLabel></Statistic>
            <TextLabel>Volume</TextLabel>
          </StatsBox>
        </StatsPanel>
      </Right>

      <ActivityFeedOptionsMenu
        showMenu={showMenu}
        deleteWorkout={deleteWorkout}
        toggleMenu={toggleMenu}
        workout={workout}
        historyLink={historyLink}
      />
    </Tile>
  );
};

