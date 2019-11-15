import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { animated } from 'react-spring';

import {
  State, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  TOGGLE_SOUND,
  superLightGrey,
} from '../helpers/constants';
import BackLinkBanner from '../components/BackLinkBanner';

const EditPage = styled(animated.div)`
  top: 0px;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: ${superLightGrey};
  z-index: 3;
`;

interface OwnProps {
  animationStyles: React.CSSProperties;
}

type Props = StateProps & DispatchProps & OwnProps;

const SettingAudio: React.FC<Props> = ({
  soundOn,
  toggleSound,
  animationStyles,
}) => {
  const [soundOnLocal, setSoundOnLocal] = useState(true);
  const [settingHasChanged, setSettingHasChanged] = useState(false);

  return (
    <EditPage key={'unique'} style={{ left: animationStyles.left }}>
      <BackLinkBanner
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
      <label>
        <input
          checked={settingHasChanged ? soundOnLocal : soundOn}
          type="radio"
          onChange={() => {
            if (!settingHasChanged) {
              setSettingHasChanged(true);
            }
            setSoundOnLocal(true);
          }}
        />
        on
      </label>
      <label>
        <input
          checked={settingHasChanged ? !soundOnLocal : !soundOn}
          type="radio"
          onChange={() => {
            if (!settingHasChanged) {
              setSettingHasChanged(true);
            }
            setSoundOnLocal(false);
          }}
        />
        off
      </label>
    </EditPage>
  );
};

interface StateProps {
  soundOn: boolean;
}

interface DispatchProps {
  toggleSound: (soundOn: boolean) => ReduxAction<boolean>;
}

const mapStateToProps = (state: State): StateProps => ({
  soundOn: state.settings.soundOn,
});

const mapDispatchToProps: DispatchProps = {
  toggleSound: soundOn => ({
    type: TOGGLE_SOUND,
    payload: soundOn,
  }),
};

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(SettingAudio);
