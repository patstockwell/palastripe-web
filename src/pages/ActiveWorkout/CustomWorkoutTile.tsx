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

interface Props {
  setShowHiddenArea: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomWorkoutTile: React.FC<Props> = ({ setShowHiddenArea }) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleAddActivityClick = () => {
    setShowSearch(true);
    setShowHiddenArea(false);
  };

  const handleFinishSearchClick = () => {
    setShowSearch(false);
    setShowHiddenArea(true);
  };

  return (
    <>
      <AddActivityButton onClick={handleAddActivityClick}>
        + Add a set
      </AddActivityButton>

      {showSearch &&
        <ActivitySearch finishSearch={handleFinishSearchClick}/>
      }
    </>
  );
};
