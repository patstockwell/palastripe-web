import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SkinnyAdditionSymbol } from '../assets/svg/AdditionSymbol';
import { navBarHeight } from '../helpers/constants';

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: darkgrey;
`;

const SymbolWrapper = styled.span`
  display: flex;
  justify-content: center;
  height: 48px;
  width: 48px;
`;

const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  background-color: white;
  top: ${navBarHeight - 2}px;
  padding: 4px;
`;

const Message = styled.span`
  margin-top: 13px;
`;

const AddWorkoutLink = () => (
  <Panel>
    <StyledLink to={{
      pathname: '/edit-workout/',
      state: { immediate: false },
    }}>
      <Message>Create workout</Message>
      <SymbolWrapper>
        <SkinnyAdditionSymbol style={{ width: '24px', fill: 'black' }} />
      </SymbolWrapper>
    </StyledLink>
  </Panel>
);

export default AddWorkoutLink;
