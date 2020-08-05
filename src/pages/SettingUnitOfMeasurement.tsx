import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { State } from '../helpers/types';
import { BackLinkBanner } from '../components/BackLinkBanner';
import { lightGrey3, charcoal } from '../helpers/constants';
import { CheckboxTick } from '../components/Checkbox';
import { useSettings } from '../reducers/settingsReducer';

export const EditPage = styled.div`
  min-height: 100vh;
  background-color: ${lightGrey3};
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

export const SettingUnitOfMeasurement: React.FC = () => {
  const { useKilos: useKilosRedux } = useSelector((s: State) => s.settings);
  const [useKilosLocal, setUseKilosLocal] = useState(true);
  const [measurementHasChanged, setMeasurementHasChanged] = useState(false);
  const { setUseKilos } = useSettings();
  const useKilos = measurementHasChanged ? useKilosLocal : useKilosRedux;

  return (
    <EditPage>
      <BackLinkBanner
        heading={'Unit Of Measurement'}
        back={{
          showArrows: true,
          link: '/profile/',
          handleClick: () => {
            setUseKilos(measurementHasChanged
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
