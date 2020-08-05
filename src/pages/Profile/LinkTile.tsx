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

const Section = styled.section`
  cursor: pointer;
`;

const ShowEditArrowWrapper = styled.div`
  position: absolute;
  right: ${gutterWidth}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;

const Value = styled.p`
  color: grey;
  font-style: italic;
  margin: 0;
`;

interface Props {
  label: string;
  subLabel?: string;
  to: string;
}

export const LinkTile: React.FC<Props> = ({ label, subLabel, to }) => (
  <Section>
    <ShowEditArrowWrapper>
      <ForwardArrow style={{ fill: 'grey' }}/>
    </ShowEditArrowWrapper>
    <Label to={to}>{label}</Label>
    <Value>{subLabel}</Value>
  </Section>
);
