import styled from 'styled-components';
import { purple, green } from '../../helpers/constants';

const Set = styled.button`
  color: ${({ text }) => text};
  background-color: ${({ background }) => background};
  border: 3px solid ${({ border }) => border};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0px;
  font-size: 22px;
  font-weight: 600;
  // stops double-tap-to-zoom
  touch-action: manipulation;
`;

export const getTheme = (completedReps, max) => {
  if (completedReps === undefined) {
    return { border: 'lightgrey', background: 'lightgrey', text: 'white' };
  } else if (completedReps <= 0) {
    return { border: 'grey', background: 'grey', text: 'white' };
  } else if (completedReps >= max) {
    return { border: green, background: green, text: 'white' };
  } else {
    return { border: purple, background: purple, text: 'white' };
  }
};

export default Set;

