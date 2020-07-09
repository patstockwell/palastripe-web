import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { Banner } from './Banner';
import Navigation from './Navigation';
import {
  gutterWidth,
  bannerHeight,
} from '../helpers/constants';
import { useScrollPosition } from '../context/useScrollPosition';

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

interface Props {
  heading: string;
  hideNavigation?: boolean;
}

export const Page: React.FC<Props> = ({
  hideNavigation,
  heading,
  children,
}) => {
  const observerTarget = useRef(null);
  const [headingHidden, setHeadingHidden] = useState(false);
  const { setScrollPosition } = useScrollPosition();
  const location = useLocation();

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

  return (
    <>
      <Banner heading={headingHidden && heading}/>
      {heading &&
        <React.Fragment>
          <Heading ref={observerTarget} >{heading}</Heading>
          <Hr />
        </React.Fragment>
      }
      {children}
      {!hideNavigation &&
        <Navigation onNavigation={() => setScrollPosition(location.pathname)} />
      }
    </>
  );
};
