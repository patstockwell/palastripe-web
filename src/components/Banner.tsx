import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { bannerHeight, gutterWidth, pink, purple } from '../helpers/constants';
import { useHasScrolled } from '../helpers/functions';

const AppLogo = styled(animated.p)`
  font-family: 'Muli', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: 900;
  font-style: italic;
  border-radius: 5px;
  padding: 3px 9px;
  background-color: ${purple};
  background-image: linear-gradient( 140deg, ${pink}, ${purple});
`;

export const Header = styled(animated.header)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column-reverse;
  background-color: white;
  border-bottom: solid 0.5px grey;
  z-index: 3;
  overflow: hidden;
  min-height: ${bannerHeight}px;
  position: sticky;
  top: -${bannerHeight + 2}px;
`;

const CollapsableHeader = styled.div`
  padding: 0 ${gutterWidth}px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${bannerHeight}px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
`;

const PageHeading = styled(animated.h1)`
  padding: 0 ${gutterWidth}px;
  display: inline-block;
`;

const VisibleHeader = styled.div`
  min-height: ${bannerHeight}px;
  width: 100%;
`;

interface Props {
  heading: string;
}

const Banner = ({ heading }: Props) => {
  const scrolled: boolean = useHasScrolled();
  const {
    fontSize,
    marginLeft,
    marginTop,
    transformHeading,
    transformLogo
  } = useSpring({
    fontSize: `${scrolled ? 1.2 : 2}em`,
    marginLeft: `${scrolled ? 50 : 0}%`,
    transformHeading: `translateX(-${scrolled ? 50 : 0}%)`,
    transformLogo: `translateY(${scrolled ? bannerHeight : 0}px)`,
    marginTop: `${scrolled ? 13 : 0}px`,
    config: { mass: 1, tension: 870, friction: 40 },
  });

  return (
    <Header>
      <VisibleHeader>
        <PageHeading style={{
          fontSize,
          marginLeft,
          marginTop,
          transform: transformHeading
        }}>
          {heading}
        </PageHeading>
      </VisibleHeader>
      <CollapsableHeader>
        <AppLogo style={{ transform: transformLogo }}>hbff</AppLogo>
      </CollapsableHeader>
    </Header>
  );
};

export default Banner;
