import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { pink, navBarHeight } from '../helpers/constants';

const Nav = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100vw;
  justify-content: space-between;
  height: ${navBarHeight}px;
  background-color: white;
  color: black;
  padding: 3px;
  box-sizing: border-box;
  border-top: solid 0.5px grey;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${({ highlight }) => highlight};
  text-decoration: none;
`;

const Navigation = ({ pathname }) => {
  return (
    <Nav>
      <NavLink
        highlight={pathname === '/' || /\/home*/.test(pathname) ? pink : 'black'}
        to="/home/"
      >
        Home
      </NavLink>
      <NavLink
        highlight={/\/workout-plans*/.test(pathname) ? pink : 'black'}
        to="/workout-plans/"
      >
        Workout Plans
      </NavLink>
      <NavLink
        highlight={/\/about*/.test(pathname) ? pink : 'black'}
        to="/about/"
      >
        About
      </NavLink>
      <NavLink
        highlight={/\/users*/.test(pathname) ? pink : 'black'}
        to="/users/"
      >
        Users
      </NavLink>
    </Nav>
  );
};

Navigation.propTypes = {
  pathname: PropTypes.string,
};

export default Navigation;

