import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutTile from './LayoutTile';
import { tileMinHeight } from '../helpers/constants';

const Tile = styled(LayoutTile)`
  min-height: ${tileMinHeight}px;
  border: 1px solid rgba(256, 256, 256, 0.3);
  background-color: rgba(256, 256, 256, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.p`
  color: black;
  margin: 16px;
  text-align: center;
`;

const EmptyTile = ({ children }) => (
  <Tile>
    <Info>{children}</Info>
  </Tile>
);

EmptyTile.propTypes = {
  children: PropTypes.node,
};

export default EmptyTile;

