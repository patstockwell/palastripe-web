import React from 'react';
import styled from 'styled-components';

import {
  ProfileNameLink,
  AudioLink,
  UnitOfMeasurementLink,
} from '../components/Profile';
import Page from '../components/Page';

const Panel = styled.div`
  background-color: white;
  margin-bottom: 8px;
  padding: 12px;
  position: relative;
`;

const Profile: React.FC<{}> = () => (
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
