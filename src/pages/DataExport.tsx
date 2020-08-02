import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import * as clipboard from 'clipboard-polyfill';

import { SuccessAlert } from '../components/AlertConfirm';
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
  const [ showMessage, setShowMessage ] = useState(false);
  const history = useSelector((state: State) => state.history);
  const copyHistoryToClipboard = () => {
    clipboard.writeText(JSON.stringify(history, null, 2));
    setShowMessage(true);
  };

  return (
    <EditPage>
      <BackLinkBanner
        heading={'Export data'}
        back={{ showArrows: true, link: '/profile/' }}
      />
      <Button onClick={copyHistoryToClipboard}>Copy to clipboard</Button>
      <Pre>{JSON.stringify(history, null, 2)}</Pre>;

      <SuccessAlert
        message="Copied to clipboard"
        setShowMessage={setShowMessage}
        showMessage={showMessage}
      />
    </EditPage>
  );
};
