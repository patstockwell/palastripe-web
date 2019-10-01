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
  CHANGE_UNIT_OF_MEASUREMENT,
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

const SettingUnitOfMeasurement: React.FC<Props> = ({
  useKilos,
  useKilosAsUnitOfMeasurement,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [useKilosLocal, setUseKilosLocal] = useState(true);
  const [measurementHasChanged, setMeasurementHasChanged] = useState(false);
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
        <Label>Unit of measurement</Label>
        <Value>{useKilos ? 'kilograms' : 'pounds'}</Value>
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
                setUseKilosLocal(useKilos);
                useKilosAsUnitOfMeasurement(useKilos);
              },
            }}
            continueTo={{
              text: 'Save',
              showArrows: false,
              link: '', // don't supply a link as the URL is not changing
              handleClick: (e: React.MouseEvent) => {
                e.preventDefault();
                setShowEdit(false);
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
      )))}
    </React.Fragment>
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
