import styled from 'styled-components';
import { workoutTileMinHeight, gutterWidth } from '../helpers/constants';

const LayoutTile = styled.div`
  color: black;
  background-color: white;
  border-radius: 5px;
  margin: 15px ${gutterWidth}px;
  box-sizing: border-box;
  min-height: ${workoutTileMinHeight}px;
  padding: 5px;
`;

export default LayoutTile;

