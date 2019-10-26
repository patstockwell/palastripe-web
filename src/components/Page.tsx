import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Banner from './Banner';
import Navigation from './Navigation';
import { gutterWidth, bannerHeight } from '../helpers/constants';

const PageWindow = styled.div`
  height: calc(100vh - (2 * ${bannerHeight}px));
  overflow: scroll;
  -webkit-overflow-scrolling:·touch;·//·enables·momentum·scolling
  position: fixed;
  top: 0;
`;

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

interface Props {
  pathname: string;
  heading?: string;
}

const Page: React.FC<Props> = ({ heading, pathname, children }) => {
  const observerRoot = useRef(null);
  const observerTarget = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const callback = ([entry]: IntersectionObserverEntry[]) => {
    setHasScrolled(!entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root: observerRoot.current,
      threshold: 0,
    });

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  });

  return (
    <React.Fragment>
      <Banner heading={hasScrolled && heading}/>
      <PageWindow ref={observerRoot} >
        {heading &&
          <React.Fragment>
            <Heading ref={observerTarget} >{heading}</Heading>
            <Hr />
          </React.Fragment>
        }
        {children}
      </PageWindow>
      <Navigation pathname={pathname} />
    </React.Fragment>
  );
};

export default Page;
