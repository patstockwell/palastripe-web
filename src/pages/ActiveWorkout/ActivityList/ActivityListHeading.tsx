import React, { useState} from 'react';
import styled from 'styled-components';
import {
  activityHeadingHeight,
  lightLightGrey,
  gutterWidth,
} from '../../../helpers/constants';

const HeadingPanel = styled.div<{ top: number }>`
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

const Input = styled.input`
  margin: 0 ${gutterWidth}px;
  background-color: white;
  border: none;
  width: 90%;
  max-width: 400px;
  font-size: 12px;
  text-transform: uppercase;

  &::placeholder {
    color: darkgrey;
  }
`;

const Heading = styled.h2`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 12px;
  text-align: left;
`;

const Sets = styled.p`
  font-size: 12px;
  color: grey;
  margin: 0 12px;
  flex-shrink: 0;
`;

interface Props {
  activityTotal?: number;
  heading: string;
  stickyTop?: number;
  id?: string;
  completedActivities?: number;
}

export const ActivityListHeading: React.FC<Props> = ({
  activityTotal,
  completedActivities = 0,
  children,
  heading,
  stickyTop,
  // id,
}) => {
  const [showInput, setShowInput] = useState(false);
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.which === 13) { // if enter key is pressed
      setShowInput(false);
    }
  };

  // const handleInputChange = (e: React.ChangeEvent) => {
  //   const target = e.target as HTMLTextAreaElement;
  //   updateName(id, target.value);
  // };

  return (
    <li key={heading}>
      <HeadingPanel top={stickyTop}>
        {showInput ? (
          <Input
            onBlur={() => setShowInput(false)}
            autoFocus
            value={heading}
            placeholder={heading}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <Heading>
            <React.Fragment>
              {heading}
            </React.Fragment>
          </Heading>
        )}
        <Sets>
          {completedActivities > 0 && `${completedActivities}/`}
          {activityTotal || 0} {activityTotal === 1 ? 'set' : 'sets'}
        </Sets>
      </HeadingPanel>
      {children}
    </li>
  );
};
