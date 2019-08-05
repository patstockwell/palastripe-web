import React, { useState} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import EditIconPencil from '../../assets/svg/EditIconPencil';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import {
  activityHeadingHeight,
  lightLightGrey,
  gutterWidth,
  EDIT_WORKOUT_UPDATE_GROUP_NAME,
} from '../../helpers/constants';

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

const Button = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
  text-align: left;
`;

interface OwnProps {
  activityTotal?: number;
  heading: string;
  stickyTop?: number;
  editable?: boolean;
  id?: string;
  completedActivities?: number;
}

type Props = OwnProps & DispatchProps;

const ActivityListHeading: React.FC<Props> = ({
  updateName,
  activityTotal,
  completedActivities,
  children,
  heading,
  stickyTop,
  editable,
  id,
}) => {
  const [showInput, setShowInput] = useState(false);
  const handleKeyPress = (e: any) => {
    if (e.which === 13) { // if enter key is pressed
      setShowInput(false);
    }
  };

  const handleInputChange = (e: any) => {
    updateName(id, e.target.value);
  };

  return (
    <li key={heading}>
      <HeadingPanel top={stickyTop}>
        {showInput ? (
          <Input
            onBlur={() => setShowInput(false)}
            autoFocus
            value={heading}
            onChange={handleInputChange}
            placeholder={heading}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <Heading>
            {editable ? (
              <Button onClick={() => setShowInput(true)}>
                <EditIconPencil
                  width={12}
                  height={12}
                  style={{ marginRight: '4px', fill: 'black' }}
                />
                {heading}
              </Button>
            ) : (
              <React.Fragment>
                {heading}
              </React.Fragment>
            )}
          </Heading>
        )}
        <Sets>
          {completedActivities !== undefined && `${completedActivities}/`}
          {activityTotal || 0} {activityTotal === 1 ? 'set' : 'sets'}
        </Sets>
      </HeadingPanel>
      {children}
    </li>
  );
};

interface DispatchProps {
  updateName: (id: string, name: string) => (
    ReduxAction<{ id: string, name: string }>);
}

const mapDispatchToProps: DispatchProps = ({
  updateName: (id, name) => ({
    type: EDIT_WORKOUT_UPDATE_GROUP_NAME,
    payload: { id, name },
  }),
});

export default connect<void, DispatchProps, OwnProps>(
  undefined,
  mapDispatchToProps
)(ActivityListHeading);
