import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { CheckboxTick } from '../components/Checkbox';
import { EditPage, Label, HiddenInput } from './SettingUnitOfMeasurement';
import { State } from '../helpers/types';
import { BackLinkBanner } from '../components/BackLinkBanner';
import { useSettings } from '../reducers/settingsReducer';

export const SettingUseRestTimer: React.FC = () => {
  const useRestTimerRedux = useSelector((s: State) => s.settings.useRestTimer);
  const [useRestTimerLocal, setUseRestTimerLocal] = useState(true);
  const [settingHasChanged, setSettingHasChanged] = useState(false);
  const { setUseRestTimer } = useSettings();
  const useRestTimer = settingHasChanged ? useRestTimerLocal : useRestTimerRedux;

  return (
    <EditPage>
      <BackLinkBanner
        heading={'Rest Timer'}
        back={{
          showArrows: true,
          link: '/profile/',
          handleClick: () => setUseRestTimer(useRestTimer),
        }}
      />
      <Label>
        <CheckboxTick checked={useRestTimer} animate={false} />
        <HiddenInput
          checked={useRestTimer}
          type="radio"
          onChange={() => {
            setSettingHasChanged(true);
            setUseRestTimerLocal(true);
          }}
        />
        on
      </Label>
      <Label>
        <CheckboxTick checked={!useRestTimer} animate={false} />
        <HiddenInput
          checked={!useRestTimer}
          type="radio"
          onChange={() => {
            setSettingHasChanged(true);
            setUseRestTimerLocal(false);
          }}
        />
        off
      </Label>
    </EditPage>
  );
};
