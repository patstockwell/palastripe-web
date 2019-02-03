import React from 'react';
import styled from 'styled-components';
import BackSplash from '../components/BackSplash';
import Navigation from '../components/Navigation';
import { orange, pink } from '../helpers/constants';
import PageHeading from '../components/PageHeading';

const P = styled.p`
  margin: 10px;
`

const Users = () => (
  <BackSplash topLeft={orange} bottomRight={pink}>
    <PageHeading>Users</PageHeading>
    <P>some user</P>
    <Navigation />
  </BackSplash>
);

export default Users;

