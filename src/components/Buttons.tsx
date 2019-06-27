import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { buttonStyle } from './SharedStyles';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const ButtonWithStyle = styled.button`
  ${buttonStyle}
`;

interface Props {
  clickHandler: () => void;
}

export const Button: React.FC<Props> = ({
  clickHandler,
  children,
}) => (
  <ButtonWithStyle onClick={clickHandler}>
    {children}
  </ButtonWithStyle>
);

interface LinkProps {
  pathname: string;
  clickHandler?: () => void;
}

const LinkWithStyle = styled(Link)`
  ${buttonStyle}
`;

export const LinkButton: React.FC<LinkProps> = ({
  clickHandler,
  pathname,
  children,
}) => (
  <LinkWithStyle
    to={{ pathname, state: { immediate: false } }}
    onClick={clickHandler}
  >
    {children}
  </LinkWithStyle>
);
