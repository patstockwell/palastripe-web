import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { connect } from 'react-redux';
import styled from 'styled-components';

import BackLinkBanner from './BackLinkBanner';
import EditIconPencil from '../assets/svg/EditIconPencil';
import {
  State, // eslint-disable-line
} from '../helpers/types';
import Avatar from '../assets/svg/Avatar';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AvatarCircle = styled.div`
  display: flex;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: lightgrey;
  border: 2px solid white;
  border-radius: 50%;
  overflow: hidden;
  margin: 24px;

  & svg {
    fill: white;
    width: 40px;
  }
`;

const NameAndEditIcon = styled.button`
  border: none;
  background: none;
  font-size: initial;
  position: relative;
  padding: 16px 0;

  & svg {
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
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

const EditPage = styled(animated.div)`
  top: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: red;
  z-index: 3;
`;

const Input = styled.input`
  background-color: white;
  border: 1px solid grey;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;

  &::placeholder {
    color: darkgrey;
  }
`;

const ProfileName: React.FC<StateProps> = ({ firstName, lastName }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const emptyName = !firstName && !lastName;
  const transitions = useTransition(showEdit, null, {
    from: { left: '100%' },
    enter: { left: '0%' },
    leave: { left: '100%' },
    config: { tension: 410, friction: 40 },
  });

  return (
    <FlexWrapper>
      <AvatarCircle>
        <Avatar />
      </AvatarCircle>
      <NameAndEditIcon onClick={() => setShowEdit(true)} >
        <EditIconPencil height={12} width={12} style={{ fill: 'grey' }} />
        {emptyName ?
          <EmptyName>Add your name</EmptyName>
          :
          <Name>{firstName} {lastName}</Name>
        }
      </NameAndEditIcon>

      {transitions.map(({ item, props }) => {
        return item ?
          <EditPage key={'unique'} style={props}>
            <BackLinkBanner back={{
              showArrows: true,
              text: 'Back',
              link: '', // don't supply a link as the URL is not changing
              handleClick: (e: React.MouseEvent) => {
                e.preventDefault();
                setShowEdit(false);
              },
            }}/>
            Slide in
            <Input
              autoFocus
              value={inputValue}
              onChange={(e: any) => {
                console.log('asdf');
                setInputValue(e.target.value);
              }}
              placeholder={'First Name'}
            />
          </EditPage>
          : null;
      })}

    </FlexWrapper>
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

export default connect<StateProps, void, void>(mapStateToProps)(ProfileName);
