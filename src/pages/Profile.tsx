import React from 'react';
import styled from 'styled-components';

import SettingUnitOfMeasurement from '../components/SettingUnitOfMeasurement';
import SettingAudio from '../components/SettingAudio';
import ProfileName from '../components/ProfileName';
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
      <ProfileName />
    </Panel>
    <Panel>
      <SettingUnitOfMeasurement />
    </Panel>
    <Panel>
      <SettingAudio />
    </Panel>
  </Page>
);

export default Profile;
