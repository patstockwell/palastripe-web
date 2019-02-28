import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { pink, navBarHeight } from '../helpers/constants';
import { User, Home, Calendar } from '../assets/SVGs';

const Nav = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100vw;
  justify-content: space-around;
  height: ${navBarHeight}px;
  background-color: white;
  color: black;
  padding: 3px;
  box-sizing: border-box;
  border-top: solid 0.5px grey;
  align-items: flex-end;
`;

const NavLink = styled(Link)`
  color: ${({ highlight }) => highlight};
  fill: ${({ highlight }) => highlight};
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;

const LinkName = styled.span`
  margin-top: 4px;
`;

const Navigation = ({ pathname }) => {
  return (
    <Nav>
      <NavLink
        highlight={pathname === '/' || /\/home*/.test(pathname) ? pink : 'black'}
        to="/home/"
      >
        <Home />
        <LinkName>Home</LinkName>
      </NavLink>
      <NavLink
        highlight={/\/workout-plans*/.test(pathname) ? pink : 'black'}
        to="/workout-plans/"
      >
        <Calendar />
        <LinkName>Workout Plans</LinkName>
      </NavLink>
      <NavLink
        highlight={/\/me*/.test(pathname) ? pink : 'black'}
        to="/me/"
      >
        <User />
        <LinkName>Me</LinkName>
      </NavLink>
    </Nav>
  );
};

Navigation.propTypes = {
  pathname: PropTypes.string,
};

export default Navigation;

