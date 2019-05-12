import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
  activityHeadingHeight,
} from '../helpers/constants';

interface Props {
  activityTotal?: number;
  heading: string;
  stickyTop?: number;
}

const HeadingPanel = styled.div`
  height: ${activityHeadingHeight}px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: ${({ top }) => top || 0}px;
`;

const Heading = styled.h2`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 12px;
`;

const Sets = styled.p`
  font-size: 12px;
  color: grey;
  margin: 0 12px;
`;

const ActivityListHeading: React.FC<Props> = ({
  activityTotal,
  children,
  heading,
  stickyTop,
}) => (
  <li>
    <HeadingPanel top={stickyTop}>
      <Heading>{heading}</Heading>
      {activityTotal &&
        <Sets>{activityTotal} {activityTotal === 1 ? 'set' : 'sets'}</Sets>
      }
    </HeadingPanel>
    {children}
  </li>
);

export default ActivityListHeading;
