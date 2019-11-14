import React, { useState } from 'react';
import { animated } from 'react-spring';
import { connect } from 'react-redux';
import styled from 'styled-components';

import BackLinkBanner from '../components/BackLinkBanner';
import { superLightGrey, gutterWidth, UPDATE_NAME } from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line
  State, // eslint-disable-line
} from '../helpers/types';

const EditPage = styled(animated.div)`
  position: fixed;
  top: 0;
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

interface OwnProps {
  animationStyles: React.CSSProperties;
}

type Props = OwnProps & StateProps & DispatchProps;

const ProfileName: React.FC<Props> = ({
  updateName,
  firstName,
  lastName,
  animationStyles,
}) => {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [firstNameHasChanged, setFirstNameHasChanged] = useState(false);
  const [lastNameHasChanged, setLastNameHasChanged] = useState(false);

  return (
    <EditPage key={'unique'} style={{ left: animationStyles.left }}>
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
