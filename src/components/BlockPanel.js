import styled from 'styled-components';
import { gutterWidth } from '../helpers/constants';

const BlockPanel = styled.div`
  color: black;
  background-color: white;
  border-radius: 5px;
  margin: 15px ${gutterWidth}px;
  box-sizing: border-box;
  min-height: 70px;
`

export default BlockPanel;

