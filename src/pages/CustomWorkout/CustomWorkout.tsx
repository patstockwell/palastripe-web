import React, { useState } from 'react';
import styled from 'styled-components';

import {
  tileMinHeight,
  lightLightGrey,
  superLightGrey,
  charcoal,
} from '../../helpers/constants';
import { ActivitySearch } from './ActivitySearch';

const AddActivityButton = styled.button`
  height: ${tileMinHeight}px;
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid ${lightLightGrey};
  background-color: ${superLightGrey}
  font-weight: 600;
  color: ${charcoal}
  margin-bottom: 30px;
`;

export const CustomWorkout: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <AddActivityButton onClick={() => setShowSearch(true)}>
        + Add a set
      </AddActivityButton>

      {showSearch &&
        <ActivitySearch finishSearch={() => setShowSearch(false)}/>
      }
    </>
  );
};
