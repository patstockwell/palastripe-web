import React from 'react';
import styled from 'styled-components';

import Banner from './Banner';
import Navigation from './Navigation';
import { bannerHeight } from '../helpers/constants';

const PageWindow = styled.div`
  height: calc(100vh - (3 * ${bannerHeight}px));
  overflow: scroll;
  -webkit-overflow-scrolling:·touch;·//·enables·momentum·scolling
  position: fixed;
  top: 0;
`;

interface Props {
  pathname: string;
  heading: string;
}

const Page: React.FC<Props> = ({ heading, pathname, children }) => {
  return (
    <React.Fragment>
      <Banner pathname={pathname} heading={heading}/>
        <PageWindow>
          {children}
        </PageWindow>
      <Navigation pathname={pathname} />
    </React.Fragment>
  );
};

export default Page;
