import styled from 'styled-components';
import { tileGap } from '../helpers/constants';
import { useSpring, animated } from 'react-spring';

export const RelativeDiv = styled.div`
  position: relative;
`;

export const FrontFace = styled(animated.div)`
  backface-visibility: hidden,
`;

export const BackFace = styled(animated.div)`
  position: absolute;
  backface-visibility: hidden;
  height: 100%;
  top: -${tileGap}px;
  left: 0;
  right: 0;
`;


export const getStyles = flip => {
  const { transform } = useSpring({
    transform: `perspective(1300px) rotateX(${flip ? 180 : 0}deg)`,
    config: { mass: 5, tension: 400, friction: 68 }
  });

  return transform;
};

export const backfaceVisibility = {
  '-webkit-backface-visibility': 'hidden',
  'backface-visibility': 'hidden',
};
