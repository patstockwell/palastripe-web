import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  State, // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { gutterWidth } from '../../helpers/constants';
import ForwardArrow from '../../assets/svg/ForwardArrow';

const Label = styled(Link)`
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 800;
  padding: 16px 0;
  text-decoration: none;
  color: black;

  // this allows the link to surround only the text, but the clickable area
  // extends to the edge of the parent div (positioned relative)
  &::after {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
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

const UnitOfMeasurement: React.FC<StateProps> = ({ useKilos }) => (
  <Section>
    <ShowEditArrowWrapper>
      <ForwardArrow style={{ fill: 'grey' }}/>
    </ShowEditArrowWrapper>
    <Label
      to={{
        pathname: '/profile/unit-of-measurement/',
        state: { immediate: false },
      }}
    >Unit of measurement</Label>
    <Value>{useKilos ? 'kilograms' : 'pounds'}</Value>
  </Section>
);

interface StateProps {
  useKilos: boolean;
}

const mapStateToProps = (state: State): StateProps => ({
  useKilos: state.settings.useKilos,
});

export default connect<StateProps, {}, {}>(
  mapStateToProps
)(UnitOfMeasurement);
