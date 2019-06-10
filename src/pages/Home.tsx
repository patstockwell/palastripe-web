import React from 'react';
import RecentActivity from '../components/RecentActivity';
import { animated } from 'react-spring';
import { connect } from 'react-redux';
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';

const Home = ({ animationStyles, location }) => {
  return (
    <animated.div style={animationStyles}>
      <Banner heading={'Home'}/>
      <RecentActivity />
      <Navigation pathname={location.pathname} />
    </animated.div>
  );
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Home);

