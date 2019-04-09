import React from 'react';
import styled from 'styled-components';
import {
  bannerHeight,
  pink,
  purple,
  workoutWindowViewport,
} from '../helpers/constants';

const Window = styled.div`
  height: ${workoutWindowViewport}vh;
  position: sticky;
  top: calc(0px - (${workoutWindowViewport}vh / 2) + ${bannerHeight}px);
  // top: calc(0px - 1vh + ${bannerHeight}px);
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0 16px;

  // put the image in an 'after' pseudo element. Set it behind the original
  // element which has opacity giving it the dark filter look
  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ imageUrl }) => imageUrl});
    background-size: cover;
    background-position: top;
    opacity: 0.5;
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
  font-family: 'Muli','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-style: italic;
`;

const Time = styled.p`
  color: white;
  size: 16px;
  font-weight: 300;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: ${bannerHeight}px;
`;

const Button = styled.button`
  color: white;
  border: none;
  background-color: ${purple};
  background-image: linear-gradient( 140deg, ${pink}, ${purple});
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 20px
  font-family: 'Muli','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-style: italic;
  text-transform: uppercase;
  margin: 16px 0;
`;

interface Props {
  imageUrl: string;
  title: string;
}

const WorkoutWindow = ({ imageUrl, title }: Props) => (
  <Window imageUrl={imageUrl}>
    <StickyContainer>
      <Title>{title}</Title>
      <Time>41min</Time>
      <Button>start</Button>
    </StickyContainer>
  </Window>
);

export default WorkoutWindow;
