import React from 'react';
import styled from 'styled-components';
import {
  activityHeadingHeight,
  lightLightGrey,
} from '../../helpers/constants';

const HeadingPanel = styled.div`
  height: ${activityHeadingHeight}px;
  background-color: white;
  border-bottom: 1px solid ${lightLightGrey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: ${({ top }) => top || 0}px;
  z-index: 2;
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

interface Props {
  activityTotal?: number;
  heading: string;
  stickyTop?: number;
}

const ActivityListHeading: React.FC<Props> = ({
  activityTotal,
  children,
  heading,
  stickyTop,
}) => (
  <li key={heading}>
    <HeadingPanel top={stickyTop}>
      <Heading>{heading}</Heading>
      {activityTotal !== undefined &&
        <Sets>{activityTotal} {activityTotal === 1 ? 'set' : 'sets'}</Sets>
      }
    </HeadingPanel>
    {children}
  </li>
);

export default ActivityListHeading;
