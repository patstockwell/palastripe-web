import React, { useState } from 'react';
import { connect } from 'react-redux';

import CheckboxTick from '../components/CheckboxTick';
import { EditPage, Label, HiddenInput } from './SettingUnitOfMeasurement';
import {
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import BackLinkBanner from '../components/BackLinkBanner';
import {
  toggleSound as toggleSoundActionCreator,
  ToggleSound,
} from '../reducers/settingsReducer';

type Props = StateProps & DispatchProps;

const SettingAudio: React.FC<Props> = ({
  soundOn: soundOnRedux,
  toggleSound,
}) => {
  const [soundOnLocal, setSoundOnLocal] = useState(true);
  const [settingHasChanged, setSettingHasChanged] = useState(false);
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
            toggleSound(settingHasChanged
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

interface DispatchProps {
  toggleSound: ToggleSound;
}

const mapStateToProps = (state: State): StateProps => ({
  soundOn: state.settings.soundOn,
});

const mapDispatchToProps: DispatchProps = {
  toggleSound: toggleSoundActionCreator,
};

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(SettingAudio);
