import styled from 'styled-components';
import { tileGap, tileMinHeight, gutterWidth } from '../helpers/constants';

const LayoutTile = styled.div`
  color: black;
  background-color: white;
  border-radius: 5px;
  margin: ${tileGap}px ${gutterWidth}px;
  box-sizing: border-box;
  min-height: ${tileMinHeight}px;
  padding: 5px;
  box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.2);
`;

export default LayoutTile;

