import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';

const Home = ({ location }) => {
  return (
    <Fragment>
      <Banner heading={'Home'}/>
      <Navigation pathname={location.pathname} />
    </Fragment>
  );
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Home);

