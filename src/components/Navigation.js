import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { navBarHeight } from '../helpers/constants'

const Nav = styled.nav`
  display: flex;
  position: fixed;
  top: calc(100vh - ${navBarHeight}px);
  width: 100vw;
  justify-content: space-between;
  height: ${navBarHeight}px;
  background-color: red;
  padding: 3px;
`;

const Navigation = () => (
  <Nav>
    <div>
      <Link to="/home">Home</Link>
    </div>
    <div>
      <Link to="/workout-plans/">Workout Plans</Link>
    </div>
    <div>
      <Link to="/about/">About</Link>
    </div>
    <div>
      <Link to="/users/">Users</Link>
    </div>
  </Nav>
)

export default Navigation;

