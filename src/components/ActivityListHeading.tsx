import React from 'react';
import styled from 'styled-components';
import {
  activityHeadingHeight,
} from '../helpers/constants';

interface Props {
  activityTotal?: number;
  heading: string;
  stickyTop?: number;
}

const ListItem = styled.li`
  height: ${activityHeadingHeight}px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: ${({ top }) => top || 0}px;

  h2 {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    margin: 0 12px;
  }

  p {
    font-size: 12px;
    color: grey;
    margin: 0 12px;
  }
`;

const ActivityListHeading: React.FC<Props> = ({ activityTotal, heading, stickyTop }) => (
  <ListItem top={stickyTop}>
    <h2>{heading}</h2>
    {activityTotal &&
      <p>{activityTotal} {activityTotal === 1 ? 'set' : 'sets'}</p>
    }
  </ListItem>
);

export default ActivityListHeading;
