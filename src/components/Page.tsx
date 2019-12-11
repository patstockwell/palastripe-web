import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Banner from './Banner';
import Navigation from './Navigation';
import {
  gutterWidth,
  SET_WINDOW_SCROLL,
  bannerHeight,
} from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { getCurrentPage } from '../helpers/functions';

const Heading = styled.h1`
  margin: ${gutterWidth}px;
`;

const Hr = styled.hr`
  position: sticky;
  top: 0;
  border: none;
  margin: 0;
  border-bottom: solid 0.5px lightgrey;
`;

interface OwnProps {
  pathname: string;
  heading?: string;
}

type Props = OwnProps & DispatchProps;

const Page: React.FC<Props> = ({
  heading,
  pathname,
  children,
  setWindowScroll,
}) => {
  const observerTarget = useRef(null);
  const [headingHidden, setHeadingHidden] = useState(false);

  const callback = ([entry]: IntersectionObserverEntry[]) => {
    setHeadingHidden(!entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
      rootMargin: `-${bannerHeight}px`,
    });

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  });

  const onNavigation = () => {
    setWindowScroll(
      window.scrollY,
      getCurrentPage(pathname)
    );
  };

  return (
    <React.Fragment>
      <Banner heading={headingHidden && heading}/>
      {heading &&
        <React.Fragment>
          <Heading ref={observerTarget} >{heading}</Heading>
          <Hr />
        </React.Fragment>
      }
      {children}
      <Navigation
        onNavigation={onNavigation}
        pathname={pathname}
      />
    </React.Fragment>
  );
};

interface DispatchProps {
  setWindowScroll: (scrollY: number, page: string) => ReduxAction<{
    scrollY: number,
    page: string
  }>;
}

const mapDispatchToProps: DispatchProps = {
  setWindowScroll: (scrollY, page) => ({
    type: SET_WINDOW_SCROLL,
    payload: {
      scrollY,
      page,
    },
  }),
};

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(Page);
