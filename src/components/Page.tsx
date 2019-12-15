import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Banner from './Banner';
import Navigation from './Navigation';
import {
  gutterWidth,
  bannerHeight,
} from '../helpers/constants';
import { getCurrentPage } from '../helpers/functions';
import {
  setWindowScroll as setWindowScrollActionCreator,
  SetWindowScroll,
} from '../reducers/scrollYReducer';

const Heading = styled.h1`
  margin: ${gutterWidth}px;
`;

const Hr = styled.hr`
  position: sticky;
  top: ${bannerHeight}px;
  border: none;
  margin: 0;
  border-bottom: solid 0.5px lightgrey;
`;

interface OwnProps {
  pathname?: string;
  heading: string;
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

  const onNavigation = (path: string) => {
    setWindowScroll(
      window.scrollY,
      getCurrentPage(path),
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
      {pathname &&
        <Navigation
          onNavigation={() => onNavigation(pathname)}
          pathname={pathname}
        />
      }
    </React.Fragment>
  );
};

interface DispatchProps {
  setWindowScroll: SetWindowScroll;
}

const mapDispatchToProps: DispatchProps = {
  setWindowScroll: setWindowScrollActionCreator,
};

export default connect<void, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(Page);
