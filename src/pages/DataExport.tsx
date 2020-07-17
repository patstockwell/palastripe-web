import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { State } from '../helpers/types';
import { buttonStyle } from '../components/SharedStyles';
import { EditPage } from './SettingUnitOfMeasurement';
import { BackLinkBanner } from '../components/BackLinkBanner';

const Pre = styled.pre`
  white-space: pre-wrap;
  width: 100vw;
  overflow: hidden;
`;

const Button = styled.button`
  ${buttonStyle}
  margin: 24px auto;
  display: block;
`;

export const DataExport = () => {
  const history = useSelector((state: State) => state.history);
  const copyHistoryToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(history, null, 2));
  };
  return (
    <EditPage>
      <BackLinkBanner
        heading={'Export data'}
        back={{ showArrows: true, link: '/profile/' }}
      />
      <Button onClick={copyHistoryToClipboard}>Copy to clipboard</Button>
      <Pre>{JSON.stringify(history, null, 2)}</Pre>;
    </EditPage>
  );
};
