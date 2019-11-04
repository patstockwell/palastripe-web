import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { PageStyle } from './SharedStyles';
import { PageRefProvider } from '../context/pageRef';
import Banner from './Banner';
import Navigation from './Navigation';
import { gutterWidth, bannerHeight } from '../helpers/constants';
import {
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const PageWindow = styled.div`
  ${PageStyle}
  height: calc(100vh - (${2 * bannerHeight}px));
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

interface OwnProps {
  pathname: string;
  heading?: string;
}

type Props = OwnProps & StateProps;

const Page: React.FC<Props> = ({ scrollY, heading, pathname, children }) => {
  const pageRef: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const observerTarget = useRef(null);
  const [headingHidden, setHeadingHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const callback = ([entry]: IntersectionObserverEntry[]) => {
    setHeadingHidden(!entry.isIntersecting);
  };

  useEffect(() => {
    if (!scrolled && scrollY && scrollY > 0) {
      pageRef.current.scrollTo(0, scrollY);
      setScrolled(true);
    }

    const observer = new IntersectionObserver(callback, {
      root: pageRef.current,
      threshold: 0,
    });

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  });

  return (
    <PageRefProvider value={pageRef}>
      <Banner heading={headingHidden && heading}/>
      <PageWindow ref={pageRef} >
        {heading &&
          <React.Fragment>
            <Heading ref={observerTarget} >{heading}</Heading>
            <Hr />
          </React.Fragment>
        }
        {children}
      </PageWindow>
      <Navigation
        onNavigation={() => setScrolled(false)}
        pageRef={pageRef}
        pathname={pathname}
      />
    </PageRefProvider>
  );
};

interface StateProps {
  scrollY: number;
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const pathToScrollYMap = {
    '/activity/': state.scrollY.ACTIVITY_PAGE,
    '/workouts/': state.scrollY.WORKOUTS_PAGE,
  };

  return {
    scrollY: pathToScrollYMap[ownProps.pathname],
  };
};

export default connect<StateProps, void, OwnProps>(
  mapStateToProps
)(Page);
