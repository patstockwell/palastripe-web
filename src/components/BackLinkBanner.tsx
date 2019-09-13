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
    handleClick?: () => void;
    showArrows: boolean;
    text?: string;
  };
  continueTo?: {
    link: string;
    text: string;
    handleClick?: () => void;
    showArrows: boolean;
  };
}

const BackLinkBanner: React.FC<Props> = ({ sticky = true, back, continueTo }) => {
  const leadingSpace = ' ';
  const backText = leadingSpace + (back.text ? back.text : 'Back');

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
          </React.Fragment>
        }
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
};

export default BackLinkBanner;
