import React, {
  CSSProperties, // eslint-disable-line no-unused-vars
  useEffect,
} from 'react';
import {
  RouteProps, // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import {
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import RecentActivity from '../components/RecentActivity';
import { animated } from 'react-spring';
import { connect } from 'react-redux';
import Banner from '../components/Banner';
import Navigation from '../components/Navigation';

interface OwnProps {
  animationStyles: CSSProperties;
}

type Props = OwnProps & StateProps & RouteProps;

const Home: React.FC<Props> = ({ scrollY = 0, animationStyles, location }) => {
  useEffect(() => {
    window.scrollTo(0, scrollY);
  });

  return (
    <animated.div style={animationStyles}>
      <Banner heading={'Home'}/>
      <RecentActivity />
      <Navigation pathname={location.pathname} />
    </animated.div>
  );
};

interface StateProps {
  scrollY: number;
}

const mapStateToProps = (state: State) => ({
  scrollY: state.scrollY.HOME,
});

export default connect<StateProps, void, void>(mapStateToProps)(Home);

