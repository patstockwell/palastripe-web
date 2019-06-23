import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../assets/svg/SearchIcon';
import { lightLightGrey } from '../helpers/constants';

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ background }) => background};
  border-radius: 50px;
  padding: 0 12px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 40px;
  font-size: 17px;
  background-color: transparent;
  margin-left: 8px;
`;

interface Props {
  inputValue: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundColour?: string;
}

const SearchBar: React.FC<Props> = ({
  inputValue,
  changeHandler,
  backgroundColour = lightLightGrey,
}) => (
  <SearchArea background={backgroundColour} >
    <SearchIcon width={20} height={20} />
    <Input type="text" value={inputValue} onChange={changeHandler} />
  </SearchArea>
);

export default SearchBar;
