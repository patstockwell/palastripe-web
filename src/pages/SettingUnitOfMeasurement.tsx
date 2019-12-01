import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { animated } from 'react-spring';

import {
  State, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import BackLinkBanner from '../components/BackLinkBanner';
import {
  CHANGE_UNIT_OF_MEASUREMENT,
  superLightGrey,
  charcoal,
} from '../helpers/constants';
import CheckboxTick from '../components/CheckboxTick';

export const EditPage = styled(animated.div)`
  top: 0px;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: ${superLightGrey};
  z-index: 3;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin: 32px;
  color: ${charcoal};
  font-style: italic;

  div {
    margin-right: 12px;
  }
`;

export const HiddenInput = styled.input`
  // use this rather than display: none or visibility: hidden so that
  // screen readers can read the inputs
  opacity: 0;
  position: absolute;
  top: -9999px;
  left: -9999px;
`;

interface OwnProps {
  animationStyles: React.CSSProperties;
}

type Props = StateProps & DispatchProps & OwnProps;

const SettingUnitOfMeasurement: React.FC<Props> = ({
  useKilos: useKilosRedux,
  useKilosAsUnitOfMeasurement,
  animationStyles,
}) => {
  const [useKilosLocal, setUseKilosLocal] = useState(true);
  const [measurementHasChanged, setMeasurementHasChanged] = useState(false);
  const useKilos = measurementHasChanged ? useKilosLocal : useKilosRedux;

  return (
    <EditPage key={'unique'} style={{ left: animationStyles.left }}>
      <BackLinkBanner
        heading={'Unit Of Measurement'}
        back={{
          showArrows: true,
          link: '/profile/',
          handleClick: () => {
            setUseKilosLocal(useKilos);
            useKilosAsUnitOfMeasurement(measurementHasChanged
              ? useKilosLocal : useKilos);
          },
        }}
      />
      <Label>
        <CheckboxTick checked={useKilos} animate={false} />
        <HiddenInput
          checked={useKilos}
          type="radio"
          onChange={() => {
            if (!measurementHasChanged) {
              setMeasurementHasChanged(true);
            }
            setUseKilosLocal(true);
          }}
        />
        kilograms
      </Label>
      <Label>
        <CheckboxTick checked={!useKilos} animate={false} />
        <HiddenInput
          checked={!useKilos}
          type="radio"
          onChange={() => {
            if (!measurementHasChanged) {
              setMeasurementHasChanged(true);
            }
            setUseKilosLocal(false);
          }}
        />
        pounds
      </Label>
    </EditPage>
  );
};

interface StateProps {
  useKilos: boolean;
}

interface DispatchProps {
  useKilosAsUnitOfMeasurement: (useKilos: boolean) => ReduxAction<boolean>;
}

const mapStateToProps = (state: State): StateProps => ({
  useKilos: state.settings.useKilos,
});

const mapDispatchToProps: DispatchProps = {
  useKilosAsUnitOfMeasurement: (useKilos) => ({
    type: CHANGE_UNIT_OF_MEASUREMENT,
    payload: useKilos,
  }),
};

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(SettingUnitOfMeasurement);
