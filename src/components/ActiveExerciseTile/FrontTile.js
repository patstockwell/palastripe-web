import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutTile from '../LayoutTile';

const ExerciseName = styled.h3`
  font-weight: 400;
  font-size: 19px;
  padding: 0 10px;
`;

const FlipButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 19px;
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: baseline;
`;

const SetsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

const FrontTile = ({ name, children, handleClick, weightInKilos }) => (
  <LayoutTile className="front">
    <HeadingWrapper>
      <ExerciseName>{name}</ExerciseName>
      <FlipButton onClick={handleClick}>{weightInKilos}kg</FlipButton>
    </HeadingWrapper>
    <SetsWrapper>
      {children}
    </SetsWrapper>
  </LayoutTile>
);

FrontTile.propTypes = {
  handleClick: PropTypes.func,
  weightInKilos: PropTypes.number,
  name: PropTypes.string,
  children: PropTypes.node,
};

const areEqualProps = (prev, next) => {
  const newRepCount = prev.children.reduce((acc, curr, i) => {
    // compare the set's number ('children') and colour ('background')
    return curr.props.children === next.children[i].props.children
      && curr.props.background === next.children[i].props.background
      && acc;
  }, true);
  return newRepCount && prev.weightInKilos === next.weightInKilos;
};

const PureFrontTile = React.memo(FrontTile, areEqualProps);

export default PureFrontTile;
