import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ProfileIcon from '../assets/svg/ProfileIcon';
import {
  purple,
  navBarHeight,
  SET_WINDOW_SCROLL,
  ACTIVITY_PAGE,
  WORKOUTS_PAGE,
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

const NavLink = styled(Link)<{ highlight: string }>`
  color: ${({ highlight }) => highlight};
  fill: ${({ highlight }) => highlight};
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  padding: 14px;
`;

interface Props {
  pageRef: React.MutableRefObject<HTMLDivElement>;
  pathname: string;
  setWindowScroll: (scrollY: number, page: string) => ReduxAction<{
    scrollY: number,
    page: string
  }>;
}

const Navigation = ({ pathname, setWindowScroll, pageRef }: Props) => {
  const isOnPage = (page: string): boolean =>
    getCurrentPage(pathname) === page;

  const handleClick = () => {
    setWindowScroll(
      pageRef.current.scrollTop,
      getCurrentPage(pathname)
    );
  };

  return (
    <Nav>
      <NavLink
        highlight={isOnPage(WORKOUTS_PAGE) ? purple : 'black'}
        to="/workouts/"
        onClick={handleClick}
      >
        <Cardiogram />
      </NavLink>
      <NavLink
        highlight={isOnPage(ACTIVITY_PAGE) ? purple : 'black'}
        to="/activity/"
        onClick={handleClick}
      >
        <ActivityBars />
      </NavLink>
      <NavLink
        highlight={'black'}
        onClick={handleClick}
        to={{
          pathname: '/profile/',
          state: { immediate: false, backPath: pathname },
        }}
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
