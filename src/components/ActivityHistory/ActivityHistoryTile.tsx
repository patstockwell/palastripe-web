import React, { memo, useState } from 'react';
import styled from 'styled-components';

import AlertConfirm from '../AlertConfirm';
import TrashCan from '../../assets/svg/TrashCan';
import Dots from '../../assets/svg/Dots';
import Avatar from '../Avatar';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import {
  getDiffInMinutes,
  getHoursAndMinutes,
  getTimeSince,
  getTotalWeightLifted,
  convertWeight,
} from '../../helpers/functions';
import {
  purple,
  superLightGrey,
} from '../../helpers/constants';
import { buttonStyle } from '../SharedStyles';

const Button = styled.button<{ background?: string }>`
  ${buttonStyle}
`;

const Tile = styled.div`
  position: relative;
  padding: 24px 12px;
  border-bottom: 0.5px solid ${superLightGrey};
  display: flex;
  box-sizing: border-box;
  min-height: 180px;
`;

const TimeSince = styled.p`
  color: grey;
  font-size: 12px;
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

const Name = styled.p`
  font-weight: 500;

  & span {
    font-weight: initial;
    // font-size: 0.9em;
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
`;

const TextLabel = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  color: grey;
`;

const OptionsButton = styled.button`
  border: none;
  background: none;
  display: flex;
  padding: 15px;
  float: right;
  margin: -15px -10px 0 0;
`;

const DropDownMenuPanel = styled.div`
  position: absolute;
  right: 2px;
  top: 64px;
  padding: 4px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.8);
  width: calc(100% - 4px);
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    top: -16px;
    left: 87%;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`;

const Menu = styled.ul`
  padding: 16px;
  margin: 0;
  list-style: none;
`;

const MenuLink = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  height: 48px;
  width: 100%;

  & span {
    margin: 0 8px;
  }
`;

interface Props {
  workout: Workout;
  showMenu: boolean;
  toggleMenu: () => void;
  deleteWorkout: () => ReduxAction<number>;
  position: number; // useful for memoizing the result of this component
  initials: string;
  useKilos: boolean;
}

const ActivityHistoryTile: React.FC<Props> = ({
  workout,
  toggleMenu,
  showMenu,
  deleteWorkout,
  useKilos,
}) => {
  const [ showDeleteWorkoutAlert, setShowDeleteWorkoutAlert ] = useState(false);

  const { name: workoutName, startTime, finishTime } = workout;
  const { unitOfMeasurement, value } = getTimeSince(finishTime);
  const {
    mins, hours, minsLabel, hoursLabel,
  } = getHoursAndMinutes(getDiffInMinutes(startTime, finishTime));
  const totalWeightLifted = getTotalWeightLifted(workout);

  const handleConfirmationClick = () => {
    deleteWorkout();
    toggleMenu();
    setShowDeleteWorkoutAlert(false);
  };

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
          <TimeSince>{value} {unitOfMeasurement} ago</TimeSince>
          <Name>You <span>completed</span></Name>
          <Name>{workoutName}</Name>
        </div>
        <StatsPanel>
          <StatsBox>
            <Statistic>
              {hours > 0 &&
                <span>{hours} <UnitLabel>{hoursLabel}</UnitLabel>{' '}</span>
              }
              {mins} <UnitLabel>{minsLabel}</UnitLabel>
            </Statistic>
            <TextLabel>Workout Time</TextLabel>
          </StatsBox>
          <StatsBox>
            <Statistic>
              {convertWeight(totalWeightLifted, useKilos)} <UnitLabel>{useKilos ? 'kg' : 'lbs'}</UnitLabel>
            </Statistic>
            <TextLabel>Total Weight</TextLabel>
          </StatsBox>
        </StatsPanel>
      </Right>

      {showMenu &&
        <DropDownMenuPanel role="menu" aria-haspopup="true">
          <Menu>
            <li>
              <MenuLink onClick={() => setShowDeleteWorkoutAlert(true)}>
                <TrashCan width={15} height={15} />
                <span>Delete</span>
              </MenuLink>
            </li>
          </Menu>
        </DropDownMenuPanel>
      }

      <AlertConfirm
        cancelAlert={() => setShowDeleteWorkoutAlert(false)}
        showAlert={showDeleteWorkoutAlert}
        message={'Are you sure you want to delete this workout?'}
      >
        <Button
          onClick={() => setShowDeleteWorkoutAlert(false)}
          background={'grey'}>No</Button>
        <Button onClick={handleConfirmationClick}>Yes</Button>
      </AlertConfirm>
    </Tile>
  );
};

const areEqualProps = (prevProps: Props, nextProps: Props): boolean => (
  prevProps.showMenu === nextProps.showMenu
  && prevProps.position === nextProps.position
);

export default memo(ActivityHistoryTile, areEqualProps);
