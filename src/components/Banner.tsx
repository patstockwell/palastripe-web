import React from 'react';
import { connect } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Avatar from '../assets/svg/Avatar';
import {
  bannerHeight,
  gutterWidth,
  pink,
  purple,
  avatarCircleDiameter,
  lightLightGrey,
  SET_WINDOW_SCROLL,
} from '../helpers/constants';
import {
  getInitials,
  getCurrentPage,
  useHasScrolled,
} from '../helpers/functions';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  RouteState, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const AppLogo = styled.p`
  font-family: 'Muli', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: 900;
  font-style: italic;
  border-radius: 5px;
  padding: 3px 9px;
  background-color: ${purple};
  background-image: linear-gradient( 140deg, ${pink}, ${purple});
`;

const AvatarCircle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${avatarCircleDiameter}px;
  height: ${avatarCircleDiameter}px;
  background-color: ${lightLightGrey};
  border-radius: 50%;
  overflow: hidden;

  text-decoration: none;
  font-size: 0.8em;
  font-weight: 800;
  color: white;

  & svg {
    fill: white;
    width: 20px;
  }
`;

export const Header = styled(animated.header)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column-reverse;
  background-color: white;
  border-bottom: solid 0.5px lightgrey;
  z-index: 3;
  overflow: hidden;
  min-height: ${bannerHeight}px;
  position: sticky;
  top: -${bannerHeight}px;
`;

const CollapsableHeader = styled(animated.div)`
  padding: 0 ${gutterWidth}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${bannerHeight}px;
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
`;

const PageHeading = styled(animated.h1)`
  display: inline-block;
`;

const VisibleHeader = styled.div`
  min-height: ${bannerHeight}px;
  width: 100%;
  padding: 0 ${gutterWidth}px;
  box-sizing: border-box;
`;

interface OwnProps {
  heading: string;
  pathname: string;
}

type Props = OwnProps & DispatchProps & StateProps;

const Banner: React.FC<Props> = ({
  setWindowScroll,
  heading,
  pathname,
  firstName,
  lastName,
}) => {
  const scrolled: boolean = useHasScrolled();
  const {
    fontSize,
    marginLeft,
    marginTop,
    transformHeading,
    transformLogo,
  } = useSpring({
    fontSize: `${scrolled ? 1.1 : 2}em`,
    marginLeft: `${scrolled ? 50 : 0}%`,
    transformHeading: `translateX(-${scrolled ? 50 : 0}%)`,
    transformLogo: `translateY(${scrolled ? bannerHeight : 0}px)`,
    marginTop: `${scrolled ? 13 : 0}px`,
    config: { mass: 1, tension: 570, friction: 40 },
  });
  const routeState: RouteState = { immediate: false, backPath: pathname };

  const handleClick = () => {
    setWindowScroll(
      window.scrollY,
      getCurrentPage(pathname)
    );
  };

  return (
    <Header>
      <VisibleHeader>
        <PageHeading style={{
          fontSize,
          marginLeft,
          marginTop,
          transform: transformHeading,
        }}>
          {heading}
        </PageHeading>
      </VisibleHeader>
      <CollapsableHeader style={{ transform: transformLogo }}>
        <AppLogo>hbff</AppLogo>
        <AvatarCircle
          onClick={handleClick}
          to={{
            pathname: '/profile/',
            state: routeState,
          }}
        >
          {firstName || lastName ?
            getInitials(firstName, lastName)
            :
            <Avatar />
          }
        </AvatarCircle>
      </CollapsableHeader>
    </Header>
  );
};

interface StateProps {
  firstName: string;
  lastName: string;
}

interface DispatchProps {
  setWindowScroll: (scrollY: number, page: string) => ReduxAction<{
    scrollY: number,
    page: string
  }>;
}

const mapStateToProps = (state: State): StateProps => ({
  firstName: state.profile.firstName,
  lastName: state.profile.lastName,
});

const mapDispatchToProps: DispatchProps = {
  setWindowScroll: (scrollY, page) => ({
    type: SET_WINDOW_SCROLL,
    payload: {
      scrollY,
      page,
    },
  }),
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Banner);
