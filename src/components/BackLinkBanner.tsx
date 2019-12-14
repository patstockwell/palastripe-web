import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BackArrow from '../assets/svg/BackArrow';
import ForwardArrow from '../assets/svg/ForwardArrow';
import { bannerHeight } from '../helpers/constants';

const StyledLink = styled(Link)`
  color: grey;
  text-decoration: none;
  font-size: 17px;
  height: 20px;
  display: flex;
  align-items: center;
  padding: 16px;
  z-index: 1;
`;

const Header = styled.header<{ sticky: boolean }>`
  display: flex;
  position: ${({ sticky }) => sticky ? 'sticky' : 'relative'};
  width: 100%;
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: ${bannerHeight}px;
  z-index: 3;
  background-color: white
`;

const Heading = styled.h1`
  position: absolute;
  font-size: 1em;
  font-weight: 800;
  width: 100%;
  text-align: center;
`;

interface Props {
  sticky?: boolean;
  heading?: string;
  back: {
    link: string;
    handleClick?: (e?: React.MouseEvent) => void;
    showArrows: boolean;
    text?: string;
  };
  continueTo?: {
    link: string;
    text: string;
    handleClick?: (e?: React.MouseEvent) => void;
    showArrows: boolean;
  };
}

const BackLinkBanner: React.FC<Props> = ({
  sticky = true,
  back,
  continueTo,
  heading,
}) => {
  return (
    <Header sticky={sticky}>

      <StyledLink
        to={{ pathname: back.link, state: { immediate: false } }}
        onClick={back.handleClick}
      >
        {back.showArrows &&
          <React.Fragment>
            <BackArrow style={{ fill: 'grey', margin: '0 -12px 0 -8px' }} />
            <BackArrow style={{ fill: 'grey' }} />
            <BackArrow style={{ fill: 'grey', margin: '0 0 0 -12px' }} />
          </React.Fragment>
        }
        {` ${back.text ? back.text : ''}`}
      </StyledLink>

      {heading && <Heading>{heading}</Heading>}

      {continueTo &&
        <StyledLink
          to={{ pathname: continueTo.link , state: { immediate: false } }}
          onClick={continueTo.handleClick}
        >
          {continueTo.text}
          {continueTo.showArrows &&
            <React.Fragment>
              <ForwardArrow style={{ fill: 'grey', margin: '0 -12px 0 0' }} />
              <ForwardArrow style={{ fill: 'grey' }} />
            </React.Fragment>
          }
        </StyledLink>
      }

    </Header>
  );
};

export default BackLinkBanner;
