import React from 'react';
import styled from 'styled-components';
import {
  RouteProps, // eslint-disable-line no-unused-vars
} from 'react-router-dom';

import {
  ProfileNameLink,
  AudioLink,
  UnitOfMeasurementLink,
} from '../components/Profile';
import { Page } from '../components/Page';
import { gutterWidth } from '../helpers/constants';

const Panel = styled.div`
  background-color: white;
  margin-bottom: 8px;
  padding: ${gutterWidth}px;
  position: relative;
`;

type Props = RouteProps;

const Profile: React.FC<Props> = ({ location }) => (
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
);

export default Profile;
