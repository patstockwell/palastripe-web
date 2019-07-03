import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  pink,
  navBarHeight,
  SET_WINDOW_SCROLL,
  ACTIVITY,
  ME,
  WORKOUTS,
} from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import User from '../assets/svg/User';
import ActivityBars from '../assets/svg/ActivityBars';
import Cardiogram from '../assets/svg/Cardiogram';

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
  align-items: flex-end;
`;

const NavLink = styled(Link)<{ highlight: string }>`
  color: ${({ highlight }) => highlight};
  fill: ${({ highlight }) => highlight};
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;

const LinkName = styled.span`
  margin-top: 4px;
`;

const getCurrentPage = (pathname: string): string => {
  if (pathname === '/' || /\/workouts*/.test(pathname)) {
    return WORKOUTS;
  } else if (/\/activity*/.test(pathname)){
    return ACTIVITY;
  } else if (/\/me*/.test(pathname)) {
    return ME;
  } else {
    return '';
  }
};

interface Props {
  pathname: string;
  setWindowScroll: (scrollY: number, page: string) => ReduxAction<{
    scrollY: number,
    page: string
  }>;
}

const Navigation = ({ pathname, setWindowScroll }: Props) => {
  const isOnPage = (page: string): boolean =>
    getCurrentPage(pathname) === page;

  const handleClick = () => {
    setWindowScroll(
      window.scrollY,
      getCurrentPage(pathname),
    );
  };

  return (
    <Nav>
      <NavLink
        highlight={isOnPage(WORKOUTS) ? pink : 'black'}
        to="/workouts/"
        onClick={handleClick}
      >
        <Cardiogram />
        <LinkName>Workouts</LinkName>
      </NavLink>
      <NavLink
        highlight={isOnPage(ACTIVITY) ? pink : 'black'}
        to="/activity/"
        onClick={handleClick}
      >
        <ActivityBars />
        <LinkName>Activity</LinkName>
      </NavLink>
      <NavLink
        highlight={isOnPage(ME) ? pink : 'black'}
        to="/me/"
        onClick={handleClick}
      >
        <User />
        <LinkName>Me</LinkName>
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

