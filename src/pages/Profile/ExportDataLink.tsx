import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { gutterWidth } from '../../helpers/constants';
import ForwardArrow from '../../assets/svg/ForwardArrow';

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

export const ExportDataLink: React.FC = () => (
  <Section>
    <ShowEditArrowWrapper>
      <ForwardArrow style={{ fill: 'grey' }}/>
    </ShowEditArrowWrapper>
    <Label to="/profile/export/">Export data</Label>
  </Section>
);
