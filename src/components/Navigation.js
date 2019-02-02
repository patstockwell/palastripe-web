import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { navBarHeight } from '../helpers/constants'

const Nav = styled.nav`
  display: flex;
  position: fixed;
  // top: calc(100vh - ${navBarHeight}px);
  bottom: 0;
  width: 100vw;
  justify-content: space-between;
  height: ${navBarHeight}px;
  background-color: black;
  color: white;
  padding: 3px;
  box-sizing: border-box;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`

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
)

export default Navigation;

