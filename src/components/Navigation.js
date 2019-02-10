import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { navBarHeight } from '../helpers/constants';

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
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Navigation = () => (
  <Nav>
    <div>
      <NavLink to="/home">Home</NavLink>
    </div>
    <div>
      <NavLink to="/workout-plans/">Workout Plans</NavLink>
    </div>
    <div>
      <NavLink to="/about/">About</NavLink>
    </div>
    <div>
      <NavLink to="/users/">Users</NavLink>
    </div>
  </Nav>
);

export default Navigation;

