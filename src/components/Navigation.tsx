import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  pink,
  navBarHeight,
  SET_WINDOW_SCROLL,
  HOME,
  ME,
  WORKOUTS,
} from '../helpers/constants';
import { ReduxAction } from '../helpers/types';
import User from '../assets/svg/User';
import Home from '../assets/svg/Home';
import Calendar from '../assets/svg/Calendar';

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

const NavLink = styled(Link)`
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
  if (pathname === '/' || /\/home*/.test(pathname)) {
    return HOME;
  } else if (/\/workouts*/.test(pathname)){
    return WORKOUTS;
  } else if (/\/me*/.test(pathname)) {
    return ME;
  } else {
    return '';
  }
};

interface Props {
  pathname: string;
  setWindowScroll: (number, string) => ReduxAction;
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
        highlight={isOnPage(HOME) ? pink : 'black'}
        to="/home/"
        onClick={handleClick}
      >
        <Home />
        <LinkName>Home</LinkName>
      </NavLink>
      <NavLink
        highlight={isOnPage(WORKOUTS) ? pink : 'black'}
        to="/workouts/"
        onClick={handleClick}
      >
        <Calendar />
        <LinkName>Workouts</LinkName>
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
  setWindowScroll: (scrollY: number, page: string) => ({
    type: SET_WINDOW_SCROLL,
    payload: {
      scrollY,
      page,
    },
  }),
};

export default connect(null, mapDispatchToProps)(Navigation);

