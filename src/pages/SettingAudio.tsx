import React, { useState } from 'react';
import { connect } from 'react-redux';

import { CheckboxTick } from '../components/Checkbox';
import { EditPage, Label, HiddenInput } from './SettingUnitOfMeasurement';
import { State } from '../helpers/types';
import { BackLinkBanner } from '../components/BackLinkBanner';
import { useSoundToggle } from '../reducers/settingsReducer';

const SettingAudio: React.FC<StateProps> = ({ soundOn: soundOnRedux }) => {
  const [soundOnLocal, setSoundOnLocal] = useState(true);
  const [settingHasChanged, setSettingHasChanged] = useState(false);
  const useSound = useSoundToggle();
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
            useSound(settingHasChanged
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

interface StateProps {
  soundOn: boolean;
}

const mapState = (state: State): StateProps => ({
  soundOn: state.settings.soundOn,
});

export default connect<StateProps, {}, {}>(
  mapState,
)(SettingAudio);
