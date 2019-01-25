import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
`;

const Navigation = () => (
    <Nav>
      <div>
        <Link to="/">Home</Link>
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

