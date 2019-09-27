import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { connect } from 'react-redux';
import styled from 'styled-components';

import BackLinkBanner from './BackLinkBanner';
import EditIconPencil from '../assets/svg/EditIconPencil';
import { superLightGrey, gutterWidth, UPDATE_NAME } from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line
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
  background-color: ${superLightGrey};
  z-index: 3;
`;

const Input = styled.input`
  background-color: white;
  border: 1px solid grey;
  box-shadow: none;
  width: 90%;
  max-width: 400px;
  padding: 16px;
  font-size: 0.75em;
  font-size: 1em;
  margin: 0px ${gutterWidth}px;
  box-sizing: border-box;

  &::placeholder {
    color: darkgrey;
  }
`;

const TopInput = styled(Input)`
  border-bottom: none;
  border-radius: 8px 8px 0 0;
`;

const BottomInput = styled(Input)`
  border-radius: 0 0 8px 8px;
`;

const InputWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = StateProps & DispatchProps;

const ProfileName: React.FC<Props> = ({ updateName, firstName, lastName }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const hasName = firstName || lastName;
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
        {hasName ?
          <Name>{firstName} {lastName}</Name>
          :
          <EmptyName>Add your name</EmptyName>
        }
      </NameAndEditIcon>

      {transitions.map(({ item, props }) => {
        return item ?
          <EditPage key={'unique'} style={props}>
            <BackLinkBanner
              back={{
                showArrows: false,
                text: 'Cancel',
                link: '', // don't supply a link as the URL is not changing
                handleClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  setFirstNameInput(firstName);
                  setLastNameInput(lastName);
                  setShowEdit(false);
                },
              }}
              continueTo={{
                text: 'Save',
                showArrows: false,
                link: '', // don't supply a link as the URL is not changing
                handleClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                  updateName({ firstName: firstNameInput, lastName: lastNameInput });
                  setShowEdit(false);
                },
              }}
            />
            <InputWrapper>
              <TopInput
                autoFocus
                value={firstNameInput || firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstNameInput(e.target.value)
                }
                placeholder={'First Name'}
              />
              <BottomInput
                value={lastNameInput || lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastNameInput(e.target.value)
                }
                placeholder={'Last Name'}
              />
            </InputWrapper>
          </EditPage>
          : null;
      })}

    </FlexWrapper>
  );
};

interface Names {
  firstName: string;
  lastName: string;
}

type StateProps = Names;

interface DispatchProps {
  updateName: (names: Names) => ReduxAction<Names>;
}

const mapDispatchToProps: DispatchProps = {
  updateName: ({ firstName, lastName }) => ({
    type: UPDATE_NAME,
    payload: {
      firstName,
      lastName,
    },
  }),
};

const mapStateToProps = (state: State): StateProps => ({
  firstName: state.profile.firstName,
  lastName: state.profile.lastName,
});

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(ProfileName);
