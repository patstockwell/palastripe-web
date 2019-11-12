import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { PageStyle } from './SharedStyles';
import { PageRefProvider } from '../context/pageRef';
import Banner from './Banner';
import Navigation from './Navigation';
import {
  gutterWidth,
  bannerHeight,
  SET_WINDOW_SCROLL,
} from '../helpers/constants';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { getCurrentPage } from '../helpers/functions';

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

type Props = OwnProps & StateProps & DispatchProps;

const Page: React.FC<Props> = ({
  scrollY,
  heading,
  pathname,
  children,
  setWindowScroll,
}) => {
  const pageRef: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const observerTarget = useRef(null);
  const [headingHidden, setHeadingHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const callback = ([entry]: IntersectionObserverEntry[]) => {
    setHeadingHidden(!entry.isIntersecting);
  };

  useEffect(() => {
    // When the component mounts, it is hard to tell if we have just navigated
    // from another page or updated due to state change. In order to stop
    // scrolling on every update, we use the `scrolled` flag to ensure we only
    // call it once per page visit.
    // We pass a callback to the nav component to reset the value.
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

  const onNavigation = () => {
    setScrolled(false);
    setWindowScroll(
      pageRef.current.scrollTop,
      getCurrentPage(pathname)
    );
  };

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
        onNavigation={onNavigation}
        pathname={pathname}
      />
    </PageRefProvider>
  );
};

interface StateProps {
  scrollY: number;
}

interface DispatchProps {
  setWindowScroll: (scrollY: number, page: string) => ReduxAction<{
    scrollY: number,
    page: string
  }>;
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

const mapDispatchToProps: DispatchProps = {
  setWindowScroll: (scrollY, page) => ({
    type: SET_WINDOW_SCROLL,
    payload: {
      scrollY,
      page,
    },
  }),
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Page);
