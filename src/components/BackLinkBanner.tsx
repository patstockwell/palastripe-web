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
  margin: 16px;
`;

const Header = styled.div<{ sticky: boolean }>`
  display: flex;
  position: ${({ sticky }) => sticky ? 'sticky' : 'relative'};
  top: 0;
  justify-content: space-between;
  align-items: center;
  height: ${bannerHeight}px;
  z-index: 3;
  background-color: white
`;

interface Props {
  sticky?: boolean;
  back: {
    link: string;
  };
  continueTo?: {
    link: string;
    text: string;
    handleClick?: () => void;
    showArrows: boolean;
  };
}

const backText = ' Back'; // <-- Leading space

const BackLinkBanner: React.FC<Props> = ({ sticky = true, back, continueTo }) => (
  <Header sticky={sticky}>

    <StyledLink to={{ pathname: back.link, state: { immediate: false } }}>
      <BackArrow style={{ fill: 'grey', margin: '0 -12px 0 -8px' }} />
      <BackArrow style={{ fill: 'grey' }} />
      {backText}
    </StyledLink>

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

export default BackLinkBanner;

