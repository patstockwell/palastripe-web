import React from 'react';
import styled from 'styled-components';
import { Activity } from '../helpers/types';
import { tileMinHeight } from '../helpers/constants';

const Tile = styled.div`
  min-height: ${tileMinHeight}px;
`;

interface Props {
  activity: Activity;
}

const ActivityTile = ({ activity }: Props) => {
  return (
    <Tile>
      {activity.name}
    </Tile>
  );
};

export default ActivityTile;
