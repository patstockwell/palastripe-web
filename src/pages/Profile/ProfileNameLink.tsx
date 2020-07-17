import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import EditIconPencil from '../../assets/svg/EditIconPencil';
import {
  State, // eslint-disable-line
} from '../../helpers/types';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  // cursor: pointer;
  position: relative;
`;

const NameAndEditIcon = styled(Link)`
  padding: 16px 0;
  text-decoration: none;
  color: black;

  // this allows the link to surround only the text, but the clickable area
  // extends to the edge of the parent div (positioned relative)
  &::after {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const EmptyName = styled.span`
  color: grey;
  margin: 8px;
  font-style: italic;
`;

const Name = styled.span`
  text-transform: uppercase;
  font-weight: 800;
  margin: 8px;
`;

const ProfileNameLink: React.FC<StateProps> = ({
  firstName,
  lastName,
}) => (
  <FlexWrapper>
    <Avatar isLargeSize />
    <NameAndEditIcon
      to={{
        pathname: '/profile/name/',
        state: { immediate: false },
      }}
    >
      <EditIconPencil height={12} width={12} style={{ fill: 'grey' }} />
      {(firstName || lastName) ?
        <Name>{firstName} {lastName}</Name>
        :
        <EmptyName>Add your name</EmptyName>
      }
    </NameAndEditIcon>
  </FlexWrapper>
);

interface StateProps {
  firstName: string;
  lastName: string;
}

const mapStateToProps = (state: State): StateProps => ({
  firstName: state.profile.firstName,
  lastName: state.profile.lastName,
});

export default connect<StateProps, {}, {}>(
  mapStateToProps
)(ProfileNameLink);
