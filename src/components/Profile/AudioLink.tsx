import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { gutterWidth } from '../../helpers/constants';
import ForwardArrow from '../../assets/svg/ForwardArrow';
import {
  State, // eslint-disable-line no-unused-vars
} from '../../helpers/types';

const Label = styled(Link)`
  text-transform: uppercase;
  font-size: 1em;
  text-decoration: none;
  color:
  black;
  font-weight: 800;

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
  margin: 0;
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

const AudioLink: React.FC<StateProps> = ({ soundOn }) => (
  <Section>
    <ShowEditArrowWrapper>
      <ForwardArrow style={{ fill: 'grey' }}/>
    </ShowEditArrowWrapper>
    <Label
      to={{
        pathname: '/profile/audio/',
        state: { immediate: false },
      }}
    >Audio</Label>
    <Value>{soundOn ? 'on' : 'off'}</Value>
  </Section>
);

interface StateProps {
  soundOn: boolean;
}

const mapStateToProps = (state: State): StateProps => ({
  soundOn: state.settings.soundOn,
});

export default connect<StateProps, {}, {}>(
  mapStateToProps
)(AudioLink);
