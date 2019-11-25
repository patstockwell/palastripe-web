import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import ProfileIcon from '../assets/svg/ProfileIcon';
import {
  purple,
  navBarHeight,
  ACTIVITY_PAGE,
  WORKOUTS_PAGE,
  PROFILE_PAGE,
  SET_NAV_ANIMATION,
} from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import ActivityBars from '../assets/svg/ActivityBars';
import Cardiogram from '../assets/svg/Cardiogram';
import { getCurrentPage } from '../helpers/functions';

const Nav = styled.nav`
  display: flex;
  position: fixed;
  // TODO: Replace this with an animated value to make it slide on/off the page?
  left: 0;
  bottom: 0;
  width: 100vw;
  justify-content: space-around;
  // add an extra 0.5 to the height to account for the 0.5px border
  min-height: ${navBarHeight}.5px;
  border-top: solid 0.5px lightgrey;
  background-color: white;
  color: black;
  box-sizing: border-box;
  align-items: center;
  padding: 3px;
  padding-bottom: env(safe-area-inset-bottom); // this is for the IPhoneX notch
`;

const home = keyframes `
  to { transform: translate(0, 0); }
`;

const NavLink = styled(Link)<{ selected: boolean, x: number }>`
  color: ${({ selected }) => selected && purple};
  fill: ${({ selected }) => selected && purple};
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  padding: 14px;

  ${({ x, selected }) => selected && css`

  &::before {
    transform: translate(${x}px, 0);
    content: '';
    height: 4px;
    width: 48px;
    background-color: ${purple};
    top: -0.5px;
    position: absolute;
    animation: ${home} 200ms ease-in-out forwards;
  }
  `}
`;

type Props = OwnProps & DispatchProps & StateProps;

interface OwnProps {
  onNavigation: () => void;
  pathname: string;
}

const Navigation: React.FC<Props> = ({
  pathname,
  onNavigation,
  setNavAnimation,
  navAnimation,
}) => {
  const workoutsRef = useRef<HTMLAnchorElement>();
  const activityRef = useRef<HTMLAnchorElement>();
  const profileRef = useRef<HTMLAnchorElement>();

  const refHash = {
    [WORKOUTS_PAGE]: workoutsRef,
    [ACTIVITY_PAGE]: activityRef,
    [PROFILE_PAGE]: profileRef,
  };

  const getTranslationDistance = (page: string): number => {
    const firstRef = refHash[getCurrentPage(pathname)];
    const lastRef = refHash[page];
    const { left: leftFirst } = firstRef.current.getBoundingClientRect();
    const { left: leftLast } = lastRef.current.getBoundingClientRect();
    return  leftFirst - leftLast;
  };

  const isOnPage = (page: string): boolean =>
    getCurrentPage(pathname) === page;

  const handleClick = (page: string) => {
    setNavAnimation(getTranslationDistance(page));
    onNavigation();
  };

  return (
    <Nav>
      <NavLink
        selected={isOnPage(WORKOUTS_PAGE)}
        to="/workouts/"
        onClick={() => handleClick(WORKOUTS_PAGE)}
        innerRef={workoutsRef}
        x={navAnimation}
      >
        <Cardiogram />
      </NavLink>
      <NavLink
        selected={isOnPage(ACTIVITY_PAGE)}
        to="/activity/"
        onClick={() => handleClick(ACTIVITY_PAGE)}
        innerRef={activityRef}
        x={navAnimation}
      >
        <ActivityBars />
      </NavLink>
      <NavLink
        selected={isOnPage(PROFILE_PAGE)}
        onClick={() => handleClick(PROFILE_PAGE)}
        to="/profile/"
        innerRef={profileRef}
        x={navAnimation}
      >
        <ProfileIcon />
      </NavLink>
    </Nav>
  );
};

interface StateProps {
  navAnimation: number;
}

const mapStateToProps = (state: State): StateProps => ({
  navAnimation: state.navAnimation,
});

interface DispatchProps {
  setNavAnimation: (x: number) => ReduxAction<number>;
}

const mapDispatchToProps: DispatchProps = {
  setNavAnimation: (x) => ({
    type: SET_NAV_ANIMATION,
    payload: x,
  }),
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
