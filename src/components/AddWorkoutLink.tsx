import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SkinnyAdditionSymbol } from '../assets/svg/AdditionSymbol';
import { navBarHeight } from '../helpers/constants';

const StyledLink = styled(Link)`
  display: flex;
  height: 48px;
  width: 48px;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  background-color: white;
  top: ${navBarHeight - 2}px;
  padding: 4px;
`;

const Message = styled.p`
  color: darkgrey;
`;

const AddWorkoutLink = () => (
  <Wrapper>
    <Message>Create workout</Message>
    <StyledLink to={{
      pathname: '/edit-workout/',
      state: { immediate: false },
    }}>
      <SkinnyAdditionSymbol style={{ width: '24px', fill: 'black' }} />
    </StyledLink>
  </Wrapper>
);

export default AddWorkoutLink;
