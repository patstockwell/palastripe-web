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
  const { useKilos, soundOn } = useSelector((state: State) => state.settings);

  return (
    <Page heading={'Profile'}>
      <Panel>
        <ProfileNameLink />
      </Panel>
      <Panel>
        <LinkTile
          subLabel={useKilos ? 'kilograms' : 'pounds'}
          label="Unit of measurement"
          to="/profile/unit-of-measurement/"
        />
      </Panel>
      <Panel>
        <LinkTile
          subLabel={soundOn ? 'on' : 'off'}
          label="Audio"
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
