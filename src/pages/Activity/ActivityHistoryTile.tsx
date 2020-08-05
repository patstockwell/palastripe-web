import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ConfirmButton, AlertConfirm } from '../../components/AlertConfirm';
import Dots from '../../assets/svg/Dots';
import Avatar from '../../components/Avatar';
import { Workout } from '../../reducers/workoutsReducer';
import { ReduxAction } from '../../helpers/types';
import {
  getDiffInMinutes,
  getHoursAndMinutes,
  getTimeSince,
  getTotalWeightLifted,
  formatWeight,
} from '../../helpers/functions';
import {
  purple,
  lightGrey3,
  charcoal,
  blue,
  orange,
  lightGrey2,
} from '../../helpers/constants';
import { useScrollPosition } from '../../context/useScrollPosition';

const Tile = styled.li`
  position: relative;
  padding: 24px 12px;
  border-bottom: 0.5px solid ${lightGrey3};
  display: flex;
  box-sizing: border-box;
  min-height: 180px;
`;

const TimeSince = styled.p`
  color: grey;
  font-size: 12px;
  margin: 0;
`;

const Left = styled.div`
  position: relative;
  margin-left: 12px;
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
  text-decoration: none
  color: inherit;

  & span {
    font-weight: initial;
    // font-size: 0.9em;
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
  toggleMenu: () => void;
  deleteWorkout: () => ReduxAction<number>;
  initials: string;
  useKilos: boolean;
  historyLink: number;
}

const ActivityHistoryTile: React.FC<Props> = ({
  workout,
  toggleMenu,
  showMenu,
  deleteWorkout,
  useKilos,
  historyLink,
}) => {
  const [ showDeleteWorkoutAlert, setShowDeleteWorkoutAlert ] = useState(false);
  const { setActivityPageScrollPosition } = useScrollPosition();

  const { name: workoutName, startTime, finishTime } = workout;
  const timeSince = getTimeSince(finishTime);
  const {
    mins, hours, minsLabel, hoursLabel,
  } = getHoursAndMinutes(getDiffInMinutes(startTime, finishTime));
  const totalWeightLifted = getTotalWeightLifted(workout);

  const handleConfirmationClick = () => {
    deleteWorkout();
    setShowDeleteWorkoutAlert(false);
  };

  const { label, weight } = formatWeight(totalWeightLifted, useKilos);

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
          <TimeSince>{timeSince}</TimeSince>
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

      <AlertConfirm
        cancelAlert={() => toggleMenu()}
        showAlert={showMenu}
        messageText="Options"
      >
        <ConfirmButton
          onClick={() => {
            setShowDeleteWorkoutAlert(true);
            toggleMenu();
          }}
          background={lightGrey2}
          fontColour={charcoal}
        >Delete Workout</ConfirmButton>
        <ConfirmButton
          onClick={() => toggleMenu()}
          background={blue}
        >Cancel</ConfirmButton>
      </AlertConfirm>

      <AlertConfirm
        cancelAlert={() => setShowDeleteWorkoutAlert(false)}
        showAlert={showDeleteWorkoutAlert}
        messageText="This workout will be deleted. This action cannot be undone."
      >
        <ConfirmButton background={orange} onClick={handleConfirmationClick}>Delete</ConfirmButton>
        <ConfirmButton
          onClick={() => setShowDeleteWorkoutAlert(false)}
          background={blue}
        >Cancel</ConfirmButton>
      </AlertConfirm>
    </Tile>
  );
};

export default ActivityHistoryTile;
