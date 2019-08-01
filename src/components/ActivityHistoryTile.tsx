import React, { memo, useState } from 'react';
import styled from 'styled-components';

import AlertConfirm, { Button } from './AlertConfirm';
import TrashCan from '../assets/svg/TrashCan';
import Dots from '../assets/svg/Dots';
import {
  getDiffInMinutes,
  formatDate,
  formatMinutes,
} from '../helpers/functions';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { opaqueImageInAfter } from './SharedStyles';
import { purple, gutterWidth } from '../helpers/constants';

const Image = styled.div<{ image: string }>`
  width: 100%;
  height: 300px;
  background-color: black;
  position: relative;
  z-index: -2;

  &::after {
    ${opaqueImageInAfter}
  }
`;

const TilePanel = styled.div`
  position: relative;
  padding: ${gutterWidth}px;
  padding-right: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.p`
`;

const TotalTime = styled.p`
  font-weight: 800;
  color: white;
`;

const FinishTimeAndDay = styled.p`
  color: grey;
  font-size: 12px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const OptionsButton = styled.button`
  border: none;
  background: none;
  display: flex;
  padding: 0 14px;
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
`;

const Label = styled.span`
  margin: 0 8px;
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
`;

const Pointer = styled.div`
  position: absolute;
  right: 12px;
  bottom: -12px;
  height: 24px;
  width: 24px;
  background-color: white;
  transform: rotate(45deg);
`;

interface Props {
  workout: Workout;
  showMenu: boolean;
  toggleMenu: () => void;
  deleteWorkout: () => ReduxAction<number>;
  position: number;
}

const ActivityHistoryTile: React.FC<Props> = ({
  workout,
  toggleMenu,
  showMenu,
  deleteWorkout,
}) => {
  const [ showDeleteWorkoutAlert, setShowDeleteWorkoutAlert ] = useState(false);
  const { name, startTime, finishTime } = workout;
  const { historyTileDateFormat } = formatDate(finishTime);
  const totalTime = formatMinutes(getDiffInMinutes(startTime, finishTime));

  const handleMenuClick = (e: any) => {
    e.preventDefault();
    toggleMenu();
  };

  const handleConfirmationClick = () => {
    deleteWorkout();
    toggleMenu();
    setShowDeleteWorkoutAlert(false);
  };

  return (
    <div>
      <TilePanel>
        <div>
          <Name>{name}</Name>
          <FinishTimeAndDay>{historyTileDateFormat}</FinishTimeAndDay>
        </div>
        <OptionsButton onClick={handleMenuClick}>
          <Dots />
        </OptionsButton>
        {showMenu &&
          <DropDownMenuPanel role="menu" aria-haspopup="true">
            <Wrapper>
              <Pointer />
            </Wrapper>
            <Menu>
              <li>
                <MenuLink onClick={() => setShowDeleteWorkoutAlert(true)}>
                  <TrashCan width={15} height={15} />
                  <Label>Delete</Label>
                </MenuLink>
              </li>
            </Menu>
          </DropDownMenuPanel>
        }
      </TilePanel>
      <Image image={workout.imageUrl}>
        <TilePanel>
          <TotalTime>{totalTime}</TotalTime>
        </TilePanel>
      </Image>

      <AlertConfirm
        cancelAlert={() => setShowDeleteWorkoutAlert(false)}
        showAlert={showDeleteWorkoutAlert}
        message={'Are you sure you want to delete this workout?'}
      >
        <Button
          onClick={() => setShowDeleteWorkoutAlert(false)}
          background={'grey'}>No</Button>
        <Button
          onClick={handleConfirmationClick}
          background={purple}>Yes</Button>
      </AlertConfirm>
    </div>
  );
};

const areEqualProps = (prevProps: Props, nextProps: Props): boolean => (
  prevProps.showMenu === nextProps.showMenu
  && prevProps.position === nextProps.position
);

export default memo(ActivityHistoryTile, areEqualProps);
