import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import BackLinkBanner from '../components/BackLinkBanner';
import {
  superLightGrey,
  charcoal,
} from '../helpers/constants';
import CheckboxTick from '../components/CheckboxTick';
import { useKilosToggle } from '../reducers/settingsReducer';

export const EditPage = styled.div`
  height: 100vh;
  background-color: ${superLightGrey};
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

const SettingUnitOfMeasurement: React.FC<StateProps> = ({
  useKilos: useKilosRedux,
}) => {
  const [useKilosLocal, setUseKilosLocal] = useState(true);
  const [measurementHasChanged, setMeasurementHasChanged] = useState(false);
  const useKilosAsUnitOfMeasurement = useKilosToggle();
  const useKilos = measurementHasChanged ? useKilosLocal : useKilosRedux;

  return (
    <EditPage>
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

const mapState = (state: State): StateProps => ({
  useKilos: state.settings.useKilos,
});

export default connect<StateProps, {}, void>(
  mapState,
)(SettingUnitOfMeasurement);
