import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { BackLinkBanner } from '../components/BackLinkBanner';
import { lightGrey3, gutterWidth } from '../helpers/constants';
import {
  State, // eslint-disable-line
} from '../helpers/types';
import { useUpdateName } from '../reducers/profileReducer';

const EditPage = styled.div`
  height: 100vh;
  background-color: ${lightGrey3};
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
  outline: none;

  &:focus: {
    outline: none;
  }

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

const ProfileName: React.FC<StateProps> = ({ firstName, lastName }) => {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [firstNameHasChanged, setFirstNameHasChanged] = useState(false);
  const [lastNameHasChanged, setLastNameHasChanged] = useState(false);
  const updateName = useUpdateName();

  return (
    <EditPage>
      <BackLinkBanner
        back={{
          showArrows: true,
          text: '',
          link: '/profile/',
          handleClick: () => {
            updateName({
              firstName: firstNameHasChanged ? firstNameInput : firstName,
              lastName: lastNameHasChanged ? lastNameInput : lastName,
            });
          },
        }}
      />
      <InputWrapper>
        <TopInput
          autoFocus
          value={firstNameHasChanged ? firstNameInput : firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFirstNameInput(e.target.value);
            setFirstNameHasChanged(true);
          }}
          placeholder={'First Name'}
        />
        <BottomInput
          value={lastNameHasChanged ? lastNameInput : lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLastNameInput(e.target.value);
            setLastNameHasChanged(true);
          }}
          placeholder={'Last Name'}
        />
      </InputWrapper>
    </EditPage>
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

export default connect<StateProps, {}, {}>(
  mapStateToProps,
)(ProfileName);
