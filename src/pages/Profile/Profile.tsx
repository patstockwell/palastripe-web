import React from 'react';
import styled from 'styled-components';
import { RouteProps } from 'react-router-dom';

import ProfileNameLink from './ProfileNameLink';
import AudioLink from './AudioLink';
import UnitOfMeasurementLink from './UnitOfMeasurementLink';
import { ExportDataLink } from './ExportDataLink';
import { Page } from '../../components/Page';
import { gutterWidth } from '../../helpers/constants';

const Panel = styled.div`
  background-color: white;
  margin-bottom: 8px;
  padding: ${gutterWidth}px;
  position: relative;
`;

const BottomSpace = styled.div`
  height: 100px;
`;

type Props = RouteProps;

export const Profile: React.FC<Props> = () => (
  <Page heading={'Profile'}>
    <Panel>
      <ProfileNameLink />
    </Panel>
    <Panel>
      <UnitOfMeasurementLink />
    </Panel>
    <Panel>
      <AudioLink />
    </Panel>
    <Panel>
      <ExportDataLink />
    </Panel>
    <BottomSpace />
  </Page>
);
