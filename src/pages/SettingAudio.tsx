import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { CheckboxTick } from '../components/Checkbox';
import { EditPage, Label, HiddenInput } from './SettingUnitOfMeasurement';
import { State } from '../helpers/types';
import { BackLinkBanner } from '../components/BackLinkBanner';
import { useSettings } from '../reducers/settingsReducer';

export const SettingAudio: React.FC = () => {
  const { soundOn: soundOnRedux } = useSelector((s: State) => s.settings);
  const [soundOnLocal, setSoundOnLocal] = useState(true);
  const [settingHasChanged, setSettingHasChanged] = useState(false);
  const { setUseSound } = useSettings();
  const soundOn = settingHasChanged ? soundOnLocal : soundOnRedux;

  return (
    <EditPage>
      <BackLinkBanner
        heading={'Audio'}
        back={{
          showArrows: true,
          link: '/profile/',
          handleClick: () => {
            setSoundOnLocal(soundOn);
            setUseSound(settingHasChanged
              ? soundOnLocal : soundOn);
          },
        }}
      />
      <Label>
        <CheckboxTick checked={soundOn} animate={false} />
        <HiddenInput
          checked={soundOn}
          type="radio"
          onChange={() => {
            if (!settingHasChanged) {
              setSettingHasChanged(true);
            }
            setSoundOnLocal(true);
          }}
        />
        on
      </Label>
      <Label>
        <CheckboxTick checked={!soundOn} animate={false} />
        <HiddenInput
          checked={!soundOn}
          type="radio"
          onChange={() => {
            if (!settingHasChanged) {
              setSettingHasChanged(true);
            }
            setSoundOnLocal(false);
          }}
        />
        off
      </Label>
    </EditPage>
  );
};
