import styled from 'styled-components';
import { tileGap } from '../helpers/constants';

const FlipContainer = styled.div`
  perspective: 1000px;
  transition: 0.6s;
  transform-style: preserve-3d;

  &.flip {
    transform: rotateX(180deg);
  }

  .back {
    transform: rotateX(180deg);
    backface-visibility: hidden;
    position: absolute;
    height: 100%;
    top: -${tileGap}px;
    left: 0;
    right: 0;
  }

  .front {
    transform: rotateX(0deg);
    backface-visibility: hidden;
    z-index: 2;
  }
`;


export default FlipContainer;

