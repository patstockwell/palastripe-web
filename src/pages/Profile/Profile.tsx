import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router-dom';

import ProfileNameLink from './ProfileNameLink';
import { LinkTile } from './LinkTile';
import { Page } from '../../components/Page';
import { gutterWidth } from '../../helpers/constants';
import { State } from '../../helpers/types';

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

export const Profile: React.FC<Props> = () => {
  const { useKilos, soundOn, useRestTimer } = useSelector((state: State) => state.settings);

  return (
    <Page heading={'Profile'}>
      <Panel>
        <ProfileNameLink />
      </Panel>
      <Panel>
        <LinkTile
          label="Unit of measurement"
          subLabel={useKilos ? 'kilograms' : 'pounds'}
          to="/profile/unit-of-measurement/"
        />
      </Panel>
      <Panel>
        <LinkTile
          label="Rest timer"
          subLabel={useRestTimer ? 'on' : 'off'}
          to="/profile/rest-timer/"
        />
      </Panel>
      <Panel>
        <LinkTile
          label="Audio"
          subLabel={soundOn ? 'on' : 'off'}
          to="/profile/audio/"
        />
      </Panel>
      <Panel>
        <LinkTile
          label="Export data"
          to="/profile/export/"
        />
      </Panel>
      <BottomSpace />
    </Page>
  );
};
