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
} from '../helpers/constants';

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

const SettingUnitOfMeasurement: React.FC<Props> = ({
  useKilos,
  useKilosAsUnitOfMeasurement,
  animationStyles,
}) => {
  const [useKilosLocal, setUseKilosLocal] = useState(true);
  const [measurementHasChanged, setMeasurementHasChanged] = useState(false);

  return (
    <EditPage key={'unique'} style={{ left: animationStyles.left }}>
      <BackLinkBanner
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
      <label>
        <input
          checked={measurementHasChanged ? useKilosLocal : useKilos}
          type="radio"
          onChange={() => {
            if (!measurementHasChanged) {
              setMeasurementHasChanged(true);
            }
            setUseKilosLocal(true);
          }}
        />
        kilograms
      </label>
      <label>
        <input
          checked={measurementHasChanged ? !useKilosLocal : !useKilos}
          type="radio"
          onChange={() => {
            if (!measurementHasChanged) {
              setMeasurementHasChanged(true);
            }
            setUseKilosLocal(false);
          }}
        />
        pounds
      </label>
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
