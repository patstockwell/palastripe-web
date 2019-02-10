import React from 'react';
import PropTypes from 'prop-types';
import BackSplash from '../components/BackSplash';
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';
import { green, yellow } from '../helpers/constants';

const Users = ({ location }) => (
  <BackSplash topLeft={green} bottomRight={yellow}>
    <Banner />
    <Navigation pathname={location.pathname}/>
  </BackSplash>
);

Users.propTypes = {
  location: PropTypes.object,
};

export default Users;

