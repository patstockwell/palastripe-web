import React from 'react';
import styled from 'styled-components';
import GoldCupBase64 from '../assets/GoldCupBase64';

const Title = styled.h1`
  font-family: 'Muli', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: black;
  text-align: center;
  font-size: 25px;
  font-weight: 900;
  font-style: italic;
  padding: 0 5px;
`;

const Image = styled.img`
  height: 100%;
`;

export const TopPanel = styled.div`
  display: flex;
  background-color: white;
  position: sticky;
  top: 0;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-bottom: solid 0.5px grey;
`;

const Banner = () => (
  <TopPanel>
    <Image src={GoldCupBase64} />
    <Title>hbff</Title>
  </TopPanel>
);

export default Banner;
