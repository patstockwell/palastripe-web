import React from 'react';
import BackSplash from '../components/BackSplash';
import { orange, pink } from '../helpers/constants';
import PageHeading from '../components/PageHeading';

const Users = () => (
  <BackSplash topLeft={orange} bottomRight={pink}>
    <PageHeading>Users</PageHeading>
    <p>someuser</p>
  </BackSplash>
);

export default Users;

