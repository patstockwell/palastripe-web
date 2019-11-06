import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

import {
  State, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import BackLinkBanner from '../components/BackLinkBanner';
import ForwardArrow from '../assets/svg/ForwardArrow';
import {
  TOGGLE_SOUND,
  superLightGrey,
  gutterWidth,
} from '../helpers/constants';

const EditPage = styled(animated.div)`
  top: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: ${superLightGrey};
  z-index: 3;
`;

const Label = styled.h2`
  text-transform: uppercase;
  font-size: 1em;
`;

const Value = styled.p`
  color: grey;
  font-style: italic;
`;

const ShowEditArrowWrapper = styled.div`
  position: absolute;
  right: ${gutterWidth}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;

const Section = styled.section`
  cursor: pointer;
`;

type Props = StateProps & DispatchProps;

const SettingAudio: React.FC<Props> = ({
  soundOn,
  toggleSound,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [soundOnLocal, setSoundOnLocal] = useState(true);
  const [settingHasChanged, setSettingHasChanged] = useState(false);
  const transitions = useTransition(showEdit, null, {
    from: { left: '100%' },
    enter: { left: '0%' },
    leave: { left: '100%' },
    config: { tension: 410, friction: 40 },
  });

  return (
    <React.Fragment>
      <Section onClick={() => setShowEdit(true)} >
        <ShowEditArrowWrapper>
          <ForwardArrow style={{ fill: 'grey' }}/>
        </ShowEditArrowWrapper>
        <Label>Sound</Label>
        <Value>{soundOn ? 'on' : 'off'}</Value>
      </Section>

      {transitions.map(({ item, props }) => (item && (
        <EditPage key={'unique'} style={props}>
          <BackLinkBanner
            back={{
              showArrows: false,
              text: 'Cancel',
              link: '', // don't supply a link as the URL is not changing
              handleClick: (e: React.MouseEvent) => {
                e.preventDefault();
                setShowEdit(false);
                setSoundOnLocal(soundOn);
                toggleSound(soundOn);
              },
            }}
            continueTo={{
              text: 'Save',
              showArrows: false,
              link: '', // don't supply a link as the URL is not changing
              handleClick: (e: React.MouseEvent) => {
                e.preventDefault();
                setShowEdit(false);
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
      )))}
    </React.Fragment>
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
