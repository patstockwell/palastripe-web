import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { lightGrey1 } from '../helpers/constants';
import { getInitials } from '../helpers/functions';
import {
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import ProfileIcon from '../assets/svg/ProfileIcon';

interface OwnProps {
  isLargeSize?: boolean;
  backgroundColour?: string;
  colour?: string;
}

const AvatarCircle = styled.div<OwnProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ isLargeSize }) => isLargeSize ? 80 : 32}px;
  height: ${({ isLargeSize }) => isLargeSize ? 80 : 32}px;
  background-color: ${({ backgroundColour: b }) => b || lightGrey1};
  border: 2px solid white;
  border-radius: 50%;
  overflow: hidden;
  // margin: ${({ isLargeSize }) => isLargeSize && 24}px;
  box-sizing: border-box;

  & span {
    font-weight: 800;
    color: white;
    font-size: ${({ isLargeSize }) => isLargeSize ? 1.5 : 0.8}em;
  }

  & svg {
    fill: white;
    width: ${({ isLargeSize }) => isLargeSize ? 40 : 20}px;
  }
`;

type Props = StateProps & OwnProps;

const Avatar: React.FC<Props> = ({
  firstName,
  lastName,
  backgroundColour,
  isLargeSize,
  colour,
}) => {
  const style = {
    width: isLargeSize ? '50%' : '60%',
    height: isLargeSize ? '50%' : '60%',
  };

  return (
    <AvatarCircle
      isLargeSize={isLargeSize}
      backgroundColour={backgroundColour}
      colour={colour}
    >
      {firstName || lastName ?
        <span>{getInitials(firstName, lastName)}</span>
        :
        <ProfileIcon style={style} />
      }
    </AvatarCircle>
  );
};

interface StateProps {
  firstName: string;
  lastName: string;
}

const mapStateToProps = (state: State): StateProps => ({
  firstName: state.profile.firstName,
  lastName: state.profile.lastName,
});

export default connect<StateProps, {}, {}>(mapStateToProps)(Avatar);
