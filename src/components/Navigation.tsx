import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import ProfileIcon from '../assets/svg/ProfileIcon';
import {
  purple,
  navBarHeight,
  SET_WINDOW_SCROLL,
  ACTIVITY_PAGE,
  WORKOUTS_PAGE,
  PROFILE_PAGE,
} from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import ActivityBars from '../assets/svg/ActivityBars';
import Cardiogram from '../assets/svg/Cardiogram';
import { getCurrentPage } from '../helpers/functions';

const Nav = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100vw;
  justify-content: space-around;
  height: ${navBarHeight}px;
  background-color: white;
  color: black;
  padding: 3px;
  box-sizing: border-box;
  border-top: solid 0.5px lightgrey;
  align-items: center;
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
    top: 0;
    position: absolute;
    animation: ${home} 1s ease-in-out forwards;
  }
  `}
`;

interface Props {
  onNavigation: () => void;
  pageRef: React.MutableRefObject<HTMLDivElement>;
  pathname: string;
  setWindowScroll: (scrollY: number, page: string) => ReduxAction<{
    scrollY: number,
    page: string
  }>;
}

const Navigation: React.FC<Props> = ({
  pathname,
  setWindowScroll,
  pageRef,
  onNavigation,
}) => {
  const [x, setTranslateX] = useState(0);
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
    console.log(page);
    setTranslateX(getTranslationDistance(page));
    onNavigation();
    setWindowScroll(
      pageRef.current.scrollTop,
      getCurrentPage(pathname)
    );
  };

  console.log(x);

  return (
    <Nav>
      <NavLink
        selected={isOnPage(WORKOUTS_PAGE)}
        to="/workouts/"
        onClick={() => handleClick(WORKOUTS_PAGE)}
        innerRef={workoutsRef}
        x={x}
      >
        <Cardiogram />
      </NavLink>
      <NavLink
        selected={isOnPage(ACTIVITY_PAGE)}
        to="/activity/"
        onClick={() => handleClick(ACTIVITY_PAGE)}
        innerRef={activityRef}
        x={x}
      >
        <ActivityBars />
      </NavLink>
      <NavLink
        selected={isOnPage(PROFILE_PAGE)}
        onClick={() => handleClick(PROFILE_PAGE)}
        to="/profile/"
        innerRef={profileRef}
        x={x}
      >
        <ProfileIcon />
      </NavLink>
    </Nav>
  );
};

const mapDispatchToProps = {
  setWindowScroll: (scrollY: number, page: string): ReduxAction<{
    scrollY: number,
    page: string
  }> => ({
    type: SET_WINDOW_SCROLL,
    payload: {
      scrollY,
      page,
    },
  }),
};

export default connect(null, mapDispatchToProps)(Navigation);
