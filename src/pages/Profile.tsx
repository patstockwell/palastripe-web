import React from 'react';
import styled from 'styled-components';
import {
  RouteProps, // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import { animated } from 'react-spring';
import { AnimatedSlidingPageStyle } from '../components/SharedStyles';

import {
  ProfileNameLink,
  AudioLink,
  UnitOfMeasurementLink,
} from '../components/Profile';
import Page from '../components/Page';

const AnimatedSlidingPage = styled(animated.div)`
  ${AnimatedSlidingPageStyle}
  z-index: 0;
`;

const Panel = styled.div`
  background-color: white;
  margin-bottom: 8px;
  padding: 12px;
  position: relative;
`;

interface OwnProps {
  animationStyles: React.CSSProperties;
}

type Props = OwnProps & RouteProps;

const Profile: React.FC<Props> = ({ location, animationStyles }) => (
  <AnimatedSlidingPage style={{ left: animationStyles.right }} >
    <Page heading={'Profile'} pathname={location.pathname}>
      <Panel>
        <ProfileNameLink />
      </Panel>
      <Panel>
        <UnitOfMeasurementLink />
      </Panel>
      <Panel>
        <AudioLink />
      </Panel>
    </Page>
  </AnimatedSlidingPage>
);

export default Profile;
